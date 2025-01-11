require('dotenv').config();

const { releaseVersion, releaseChangelog, releasePublish } = require('nx/release');
const { execSync } = require('node:child_process');
const { hideBin } = require('yargs/helpers');
const fs = require('node:fs');
const glob = require('glob');
const path = require('node:path');
const yargs = require('yargs/yargs');

// Build all packages
const buildAllPackages = async () => {
	console.log('🏗️  Building all packages...');

	try {
		execSync('pnpm build', {
			stdio: 'inherit',
		});

		console.log('✅ Build completed successfully');

		return true;
	} catch (error) {
		console.error('❌ Build failed:', error);

		return false;
	}
};

// Parse command line arguments
const parseOptions = async () => {
	return yargs(hideBin(process.argv))
		.version(false)
		.option('firstRelease', {
			description: 'First release',
			type: 'boolean',
			default: false,
		})
		.option('force', {
			alias: 'f',
			description: 'Force update existing tags',
			type: 'boolean',
			default: false,
		})
		.option('releaseVersion', {
			description: 'Explicit version specifier to use',
			type: 'string',
		})
		.option('dryRun', {
			alias: 'd',
			description: 'Perform a dry-run',
			type: 'boolean',
			default: false,
		})
		.option('verbose', {
			description: 'Enable verbose logging',
			type: 'boolean',
			default: false,
		})
		.option('skipBuild', {
			description: 'Skip building packages',
			type: 'boolean',
			default: false,
		})
		.parse();
};

// Update versions in all package files
const updateAllVersions = async workspaceVersion => {
	console.log('📦 Updating versions in all package files...');

	const rootPackagePath = path.join(process.cwd(), 'package.json');

	if (rootPackagePath) {
		console.log('📦 Updating root package.json version...');

		const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));

		if (rootPackage) {
			// Update root package.json version
			rootPackage.version = workspaceVersion;

			// Write updated package.json
			fs.writeFileSync(rootPackagePath, `${JSON.stringify(rootPackage, null, 2)}\n`);
		} else {
			console.error('❌ Root package.json not found');
		}
	}

	// Find all package.json files in packages/*
	const packagePaths = glob.sync('tools/*/package.json');

	if (packagePaths.length > 0) {
		console.log('📦 Updating versions in all package files...');

		for (const packagePath of packagePaths) {
			const toolPackage = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

			if (toolPackage) {
				// Update version
				toolPackage.version = workspaceVersion;

				// Write updated package.json
				fs.writeFileSync(packagePath, `${JSON.stringify(toolPackage, null, 2)}\n`);
			} else {
				console.error('❌ Tool package.json not found');
			}
		}
	}
};

// Update package versions
const updateVersions = async options => {
	console.log('📦 Updating versions...');

	// Add first release check
	const isFirstRelease = options.firstRelease;

	const versionData = await releaseVersion({
		specifier: options.releaseVersion,
		dryRun: options.dryRun,
		verbose: options.verbose,
		// Skip git-tag check for first release
		skipProjectVersionCheck: isFirstRelease,
		skipGitTag: options.force,
	});

	// Update root package.json
	if (!options.dryRun) {
		await updateAllVersions(versionData.workspaceVersion);
	} else {
		console.log('🔍 Dry run, skipping version update');
	}

	return versionData;
};

// Generate changelog
const generateChangelog = async (options, versionData, workspaceVersion) => {
	console.log('📝 Generating changelog...');

	await releaseChangelog({
		versionData,
		version: workspaceVersion,
		dryRun: options.dryRun,
		verbose: options.verbose,
		// Skip git-tag check if using force
		skipGitTag: options.force,
	});
};

// Publish packages
const publishPackages = async options => {
	console.log('🚀 Publishing packages...');

	return releasePublish({
		dryRun: options.dryRun,
		verbose: options.verbose,
		// Skip git-tag check if not using force
		skipGitTag: !options.force,
	});
};

// Check publish results
const checkPublishResults = publishResults => {
	return Object.entries(publishResults).every(([pkg, result]) => {
		if (result.code !== 0) {
			console.error(`❌ Failed to publish ${pkg}`);

			return false;
		}

		console.log(`✅ Published ${pkg} successfully`);

		return true;
	});
};

// Setup NPM auth
const setupNpmAuth = async () => {
	if (!process.env.NPM_TOKEN) {
		console.error('❌ NPM_TOKEN not found in environment variables');

		process.exit(1);
	}

	try {
		execSync(`npm config set //registry.npmjs.org/:_authToken ${process.env.NPM_TOKEN}`, {
			stdio: 'inherit',
		});
	} catch (error) {
		console.error('❌ Error setting npm configuration:', error);

		process.exit(1);
	}
};

// Main release process
const release = async () => {
	try {
		// Setup NPM auth
		await setupNpmAuth();

		const options = await parseOptions();

		// 1. Build packages
		if (!options.skipBuild) {
			const buildSuccess = await buildAllPackages();

			if (!buildSuccess) {
				process.exit(1);
			}
		}

		// 2. Version bump
		const { workspaceVersion, projectsVersionData } = await updateVersions(options);

		// 3. Generate changelog
		await generateChangelog(options, projectsVersionData, workspaceVersion);

		// 4. Publish packages
		const publishResults = await publishPackages(options);

		// 5. Check results
		const success = checkPublishResults(publishResults);

		if (success) {
			console.log('🎉 Release completed successfully!');

			process.exit(0);
		} else {
			console.error('❌ Release failed');

			process.exit(1);
		}
	} catch (error) {
		console.error('❌ Release process failed:', error);

		process.exit(1);
	}
};

// Start process
release();
