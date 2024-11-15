import _ from "lodash"
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
* Description placeholder
*/
class OpSchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of OpSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {OpExecutionArgs} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        const opKey = _.chain(context)
            .keys()
            .first()
            .value();

        const resolverName = `${opKey}SchemaResolver`;

        return await this.provider[resolverName].execute({ context: context[opKey], ...options })
    }
}

export default OpSchemaResolver

/**
* Description placeholder
*/
export class OpExecutionArgs extends ExecutionArgs {

    
    /**
     * Description placeholder
     *
     * @type {Object}
     */
    context
}