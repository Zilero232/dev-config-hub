const { releaseChangelog, releasePublish, releaseVersion } = require('nx/release');
const { execSync } = require('node:child_process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

// Сборка всех пакетов
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

// Парсинг аргументов командной строки
const parseOptions = async () => {
	return yargs(hideBin(process.argv))
		.version(false)
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

// Обновление версий пакетов
const updateVersions = async options => {
	console.log('📦 Updating versions...');
	return releaseVersion({
		specifier: options.releaseVersion,
		dryRun: options.dryRun,
		verbose: options.verbose,
	});
};

// Генерация changelog
const generateChangelog = async (options, versionData, workspaceVersion) => {
	console.log('📝 Generating changelog...');
	await releaseChangelog({
		versionData,
		version: workspaceVersion,
		dryRun: options.dryRun,
		verbose: options.verbose,
	});
};

// Публикация пакетов
const publishPackages = async options => {
	console.log('🚀 Publishing packages...');

	return releasePublish({
		dryRun: options.dryRun,
		verbose: options.verbose,
	});
};

// Проверка результатов публикации
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

// Основной процесс релиза
const release = async () => {
	try {
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

// Запуск процесса
release();
