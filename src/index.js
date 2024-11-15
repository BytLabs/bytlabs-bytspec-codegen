import "./partials.js"
import "./schema.js"
import { createContainer } from "./di.js";
import ProjectResolver from "./resolvers/project/ProjectResolver.js";
import fs from "fs-extra"
import options from "./cli.js"

async function main() {
    const OUTPUT_DIR = "./build";

    const container = await createContainer();
    const spec = await fs.readJSON("./specs/commerce-platform.json");

    // Ensure output directory is clean
    if (options.deleteExistingFiles) {
        await fs.remove(OUTPUT_DIR);
        await fs.ensureDir(OUTPUT_DIR);
      }
    
    /**
     * Description placeholder
     *
     * @type {ProjectResolver}
     */
    const projectResolver = container.resolve("projectResolver");
    projectResolver.execute({spec, outputDirectory: OUTPUT_DIR, deleteExistingFiles: false})
}

main().catch(err => console.log(err));