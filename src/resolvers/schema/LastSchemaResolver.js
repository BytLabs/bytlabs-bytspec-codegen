import { Builder } from "builder-pattern";
import { ExecutionArgs } from "../../def/executionArgs.js";
import { Provider } from "../../def/provider.js";
import { LastSchema } from "../../schema.js";
import compileTemplate from "../../utils/compileTemplate.js";
import path from "path";

/**
* Description placeholder
*/
class LastSchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of LastSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {ExecutionArgs & { context:LastSchema }} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        const lastContext = Builder(LastTemplateContext)
            .in(await this.provider.variableSchemaResolver.execute({ context: context.in, ...options }))
            .build()

        //parse template
        return await compileTemplate(path.join(this.provider.schemaTemplate, `last.hbs`), lastContext)
    }
}

export default LastSchemaResolver

/**
* Description placeholder
*/
export class LastExectionArgs extends ExecutionArgs {

    
    /**
     * Description placeholder
     *
     * @type {LastSchema}
     */
    context
}

/**
* Description placeholder
*/
class LastTemplateContext {

    /**
    * Description placeholder
    */
    in

}