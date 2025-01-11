const fs = require('fs-extra');
const path = require('node:path');
const glob = require('glob');

// Config.
const config = {
	sourceDir: 'tools',
	outputDir: 'dist',
	rootFiles: ['LICENSE'],
	ignoredPatterns: ['**/node_modules/**', '**/*.test.*', '**/__tests__/**', '**/project.json'],
};

// Get name from arguments.
const packageName = process.argv[2];

if (!packageName) {
	console.error('❌ Package name is required');

	process.exit(1);
}

const sourcePath = path.join(config.sourceDir, packageName);
const outputPath = path.join(config.outputDir, packageName);

const buildPackage = async () => {
	try {
		// Clean destination directory.
		await fs.remove(outputPath);
		await fs.ensureDir(outputPath);

		// Copy package files.
		const files = glob.sync('**/*', {
			cwd: sourcePath,
			nodir: true,
			ignore: config.ignoredPatterns,
		});

		for (const file of files) {
			const sourceFile = path.join(sourcePath, file);
			const outputFile = path.join(outputPath, file);

			await fs.copy(sourceFile, outputFile);
		}

		// Copy root files.
		for (const rootFile of config.rootFiles) {
			const sourceFile = path.join(process.cwd(), rootFile);
			const outputFile = path.join(outputPath, rootFile);

			if (await fs.pathExists(sourceFile)) {
				await fs.copy(sourceFile, outputFile);
			}
		}

		console.log(`✅ Built ${packageName}`);
	} catch (error) {
		console.error(`❌ Error building ${packageName}:`, error);

		process.exit(1);
	}
};

buildPackage(outputPath);
