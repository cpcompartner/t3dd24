const fs = require('fs');
const path = require('path');

class RemoveHbsFilesPlugin {
    constructor(
        options
    ) {
        this.options = options
    }
    apply(compiler) {
        compiler.hooks.done.tap('RemoveHbsFilesPlugin', () => {
            const outputPath = `../../packages/${  this.options  }/ContentBlocks/ContentElements`;

            const removeHbsFiles = (dir) => {
                fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
                    if (err) throw err;

                    entries.forEach(entry => {
                        const fullPath = path.join(dir, entry.name);

                        if (entry.isDirectory()) {
                            removeHbsFiles(fullPath); // Recurse into subdirectories
                        } else if (path.extname(entry.name) === '.hbs') {
                            fs.unlink(fullPath, (err) => {
                                if (err) throw err;
                                console.log(`Removed ${fullPath}`);
                            });
                        }
                    });
                });
            };

            removeHbsFiles(outputPath);
        });
    }
}

module.exports = RemoveHbsFilesPlugin;
