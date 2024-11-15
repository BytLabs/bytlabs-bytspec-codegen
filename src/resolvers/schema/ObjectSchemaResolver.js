import { ExecutionArgs } from "../../def/executionArgs.js";
import { Provider } from "../../def/provider.js";

/**
* Description placeholder
*/
class ObjectSchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of ObjectSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {ExecutionArgs & {context: any}} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        return "//TODO ObjectSchemaResolver not implemented"
    }
}

export default ObjectSchemaResolver