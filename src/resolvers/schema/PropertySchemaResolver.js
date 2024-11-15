import { pascalCase } from "change-case";
import { Provider } from "../../def/provider.js";

/**
* Description placeholder
*/
class PropertySchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of PropertySchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {PropertyExecutionArgs} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        return pascalCase(context)
    }
}

export default PropertySchemaResolver

/**
* Description placeholder
*/
export class PropertyExecutionArgs {
    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    context
}