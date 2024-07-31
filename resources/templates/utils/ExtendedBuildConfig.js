const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const PACKAGE = require('../package.json');

/**
 * Get all folders in a directory
 * Used for CreateYamlForCopiedFolders() to automatically get all components
 * TYPO3 v13 only
 */
function getFolders(dir) {
    return fs.readdirSync(dir).filter(file => fs.lstatSync(path.join(dir, file)).isDirectory());
}

function createYamlFile(folderPath, folder) {
    if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {
        const yamlFilePath = path.join(folderPath, 'EditorInterface.yaml');

        if (!fs.existsSync(yamlFilePath)) {
            const yamlContent = {
                name: `cp/${folder}`,
                typeName: `cp/${folder}`,
                group: PACKAGE.system.sitepackage,
                prefixFields: true,
                prefixType: 'vendor',
                basics: [ 'TYPO3/Appearance' ],
                fields: [
                    {
                        identifier: 'header',
                        type: 'Text',
                        useExistingField: true
                    }
                ]
            };

            fs.writeFileSync(yamlFilePath, yaml.dump(yamlContent));
        } else {
            console.log(`YAML file already exists for folder: ${folder}`);
        }
    }
}

class ExtendedBuildConfig {
    constructor(typo3Buildpath) {
        this.componentsDir = path.resolve(__dirname, '../src/Views/Components');
        this.copiedFolders = getFolders(this.componentsDir);
        this.typo3Buildpath = typo3Buildpath;
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync('CreateYamlForCopiedFolders', (compilation, callback) => {
            const outputPath = this.typo3Buildpath.contentBlocks;

            this.copiedFolders.forEach(folder => {
                const folderPath = path.join(outputPath, folder);

                createYamlFile(folderPath, folder);
            });

            callback();
        });
    }
}

module.exports = ExtendedBuildConfig;
