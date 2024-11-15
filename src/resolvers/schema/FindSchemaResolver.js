import _ from "lodash"
import compileTemplate from '../../utils/compileTemplate.js';
import { Builder } from 'builder-pattern';
import path from "path"
import { FindSchema } from "../../schema.js";
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
* Description placeholder
*/
class FindSchemaResolver {
    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of FindSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {FindExecutionArgs} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        const findContext = Builder(FindTemplateContext)
            .in(await this.provider.variableSchemaResolver.execute({ context: context.in, ...options }))
            .value(await this.provider.matchSchemaResolver.execute({ context: context.where, ...options }))
            .build()

        //parse template
        return await compileTemplate(path.join(this.provider.schemaTemplate, `find.hbs`), findContext)
    }
}

export default FindSchemaResolver



/**
* Description placeholder
*/
export class FindExecutionArgs extends ExecutionArgs {

    
    /**
     * Description placeholder
     *
     * @type {FindSchema}
     */
    context
}


/**
 * Description placeholder
 */
export class FindTemplateContext {
    
    /**
    * Description placeholder
    */
    in

    
    /**
    * Description placeholder
    */
    value
}