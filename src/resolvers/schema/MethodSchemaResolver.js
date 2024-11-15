import { pascalCase } from "change-case";
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
* Description placeholder
*/
class MethodSchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of MethodSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {MethodExecutionArgs} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        return pascalCase(context)
    }
}

export default MethodSchemaResolver

/**
* Description placeholder
*/
export class MethodExecutionArgs extends ExecutionArgs {

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    context
}