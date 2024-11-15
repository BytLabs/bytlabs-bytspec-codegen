import path from "path";
import { pascalCase } from "change-case";

import parseTemplateWithPath from "../../utils/parseTemplateWithPath.js";
import { Provider } from "../../def/provider.js";
import { FileResolverArgs } from "../../def/fileResolverArgs.js";

/**
* Description placeholder
*/
class MiscFileResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of MiscFileResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {FileResolverArgs} param
    * @returns {Promise}
    * 
    */
    async execute({ spec, outputDirectory }) {
        const sourceDirectory = this.provider.projectTemplate;
        const boundedContextNames = Object.keys(spec.boundedContexts);
        for (let boundedContextName of boundedContextNames) {
            const projectName = pascalCase(boundedContextName);
            const templateData = {
                project: {
                    name: projectName
                }
            };
            const destinationDirectory = path.join(outputDirectory, projectName);
            await parseTemplateWithPath(sourceDirectory, destinationDirectory, ".sln", templateData);
            await parseTemplateWithPath(sourceDirectory, destinationDirectory, ".csproj", templateData);
            await parseTemplateWithPath(sourceDirectory, destinationDirectory, "Dockerfile", templateData);
            await parseTemplateWithPath(sourceDirectory, destinationDirectory, "launch.json", templateData);
            await parseTemplateWithPath(sourceDirectory, destinationDirectory, "extensions.json", templateData);
        }
    }
}

export default MiscFileResolver;