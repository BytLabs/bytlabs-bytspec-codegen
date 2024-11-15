import _ from "lodash"
import compileTemplate from '../../utils/compileTemplate.js';
import { Builder } from 'builder-pattern';
import path from "path"
import { IfSchema } from "../../schema.js";
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
* Description placeholder
*/
class IfSchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of IfSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {IfExecutionArgs} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        const ifContext = Builder(IfTemplateContext)
                            .expression(await this.provider.conditionSchemaResolver.execute({ context: context.condition, ...options }))
                            .then(await this.provider.opSchemaResolver.execute({ context: context.then, ...options }))
                            .build()

        //parse template
        return await compileTemplate(path.join(this.provider.schemaTemplate, `if.hbs`), ifContext)
    }
}

export default IfSchemaResolver


/**
* Description placeholder
*/
export class IfExecutionArgs extends ExecutionArgs {

    
    /**
     * Description placeholder
     *
     * @type {IfSchema}
     */
    context
}


/**
* Description placeholder
*/
export class IfTemplateContext {
    /**
    * Description placeholder
    */
    expression

    /**
    * Description placeholder
    */
    then
}