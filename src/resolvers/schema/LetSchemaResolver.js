import _ from "lodash"
import compileTemplate from '../../utils/compileTemplate.js';
import { Builder } from 'builder-pattern';
import path from "path"
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
* Description placeholder
*/
class LetSchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of LetSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {LetExecutionArgs} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        const letName = _.chain(context)
            .keys()
            .first()
            .value();

        const letContext = Builder(LetTemplateContext)
            .name(letName)
            .expression(await this.provider.opSchemaResolver.execute({ context: context[letName], ...options }))
            .build()

        //parse template
        return await compileTemplate(path.join(this.provider.schemaTemplate, `let.hbs`), letContext)
    }
}

export default LetSchemaResolver


export class LetExecutionArgs extends ExecutionArgs {

    
    /**
     * Description placeholder
     *
     * @type {Object}
     */
    context
}


/**
* Description placeholder
*/
export class LetTemplateContext {

    /**
    * Description placeholder
    */
    name

    /**
    * Description placeholder
    */
    expression
}