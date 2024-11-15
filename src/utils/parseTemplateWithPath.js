import fs from "fs-extra";
import path from "path";
import Handlebars from "handlebars";


/**
 * Description placeholder
 *
 * @export
 * @async
 * @param {string} srcDir
 * @param {string} destDir
 * @param {string} extension
 * @param {*} data
 * @returns {Promise}
 */
export default async function parseTemplateWithPath (srcDir, destDir, extension, data) {
    try {
        // Recursively process each file and directory
        async function processDirectory(currentSrcDir, currentDestDir) {
            // Read all items in the current source directory
            const items = await fs.readdir(currentSrcDir);

            for (const item of items) {
                const srcPath = path.join(currentSrcDir, item);
                const destPathTemplate = Handlebars.compile(item);
                const destPath = path.join(currentDestDir, destPathTemplate(data));
                const stats = await fs.stat(srcPath);

                if (stats.isDirectory()) {
                    // If the item is a directory, create the destination directory and process recursively
                    await fs.ensureDir(destPath);
                    await processDirectory(srcPath, destPath);
                } else if (item.endsWith(extension)) {
                    // Process .csproj files with Handlebars
                    const content = await fs.readFile(srcPath, "utf-8");
                    const contentTemplate = Handlebars.compile(content);
                    const newContent = contentTemplate(data);

                    // Ensure destination directory exists and write the new .csproj file
                    await fs.ensureDir(currentDestDir);
                    await fs.writeFile(destPath, newContent, "utf-8");

                    console.log(`Processed ${extension} file: ${destPath}`);
                }
            }
        }

        // Start processing from the root source directory
        await processDirectory(srcDir, destDir);

        console.log("All "+ extension +" files processed and copied with structure preserved.");
    } catch (err) {
        console.error("Error processing "+ extension +" files:", err);
    }
}
