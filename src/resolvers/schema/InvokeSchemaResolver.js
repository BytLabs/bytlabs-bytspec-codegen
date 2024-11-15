import _ from "lodash"
import compileTemplate from '../../utils/compileTemplate.js';
import { Builder } from 'builder-pattern';
import path from "path"
import { InvokeSchema } from "../../schema.js";
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
* Description placeholder
*/
class InvokeSchemaResolver {
    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of InvokeSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {InvokeExecutionArgs} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        const parameters = await Promise.all(context.method.parameters
            .map(async value => await this.provider.variableSchemaResolver.execute({ context: value, ...options })))

        const invokeContext = Builder(InvokeTempleContext)
            .target(await this.provider.variableSchemaResolver.execute({ context: context.onTarget, ...options }))
            .name(await this.provider.methodSchemaResolver.execute({ context: context.method.name, ...options }))
            .parameters(parameters)
            .build()

        return await compileTemplate(path.join(this.provider.schemaTemplate, `invoke.hbs`), invokeContext)
    }
}

export default InvokeSchemaResolver



/**
* Description placeholder
*/
export class InvokeExecutionArgs extends ExecutionArgs {

    
    /**
     * Description placeholder
     *
     * @type {InvokeSchema}
     */
    context
}

/**
* Description placeholder
*/
export class InvokeTempleContext {
    /**
    * Description placeholder
    */
    target

    /**
    * Description placeholder
    */
    name

    /**
    * Description placeholder
    */
    parameters
}
