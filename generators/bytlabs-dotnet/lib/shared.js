import fs from "fs-extra";
import path from "path";
import Handlebars from "handlebars";
import { pascalCase } from "change-case";
import typeResolver from "./resolvers/typeResolver.js";
import methodOpResolver from "./resolvers/methodOpResolver.js";
import unwrapObj from "./utils/unwrapObj.js";
import defaultValueResolver from "./resolvers/defaultValueResolver.js";

const parseTemplateWithPath = async (srcDir, destDir, extension, data) => {
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

const getClassTemplateData = (entity, boundedContext, { isEntity } = {}) => 
    {
        const projectName = pascalCase(boundedContext.name);
        const className = pascalCase(entity.name);

        const fields = unwrapObj(entity.properties)
            .map(field => ({
                type: typeResolver(field.type, field.items),
                name: pascalCase(field.name),
                default: defaultValueResolver(field.type, field.items)
            }))

        let methods = [];

        if (entity.actions) {
            methods = unwrapObj(entity.actions)
                .map(method => ({
                    name: pascalCase(method.name),
                    type: "void",
                    parameters: unwrapObj(method.parameters).map(param=>({name: param.name, type: typeResolver(param.type)})),
                    body: method.execute.map(line => methodOpResolver(line, boundedContext, { executionContext: entity }))
                }))
        }

        return {
            project: {
                name: projectName
            },
            class: {
                name: className,
                fields: isEntity? fields.filter(x=> x.name != "Id") : fields,
                methods: methods,
                aggregate: entity.aggregate,
                idType: isEntity? fields.find(x=>x.name == "Id")?.type : null
            }
        };
}

export {
    parseTemplateWithPath,
    getClassTemplateData
};