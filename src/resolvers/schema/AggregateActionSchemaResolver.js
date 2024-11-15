import { pascalCase } from "change-case";
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
* Description placeholder
*/
class AggregateActionSchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of AggregateActionSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {AggregateActionExecutionArgs} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        return pascalCase(context)
    }
}

export default AggregateActionSchemaResolver;

/**
* Description placeholder
*/
export class AggregateActionExecutionArgs extends ExecutionArgs
{
    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    context
}