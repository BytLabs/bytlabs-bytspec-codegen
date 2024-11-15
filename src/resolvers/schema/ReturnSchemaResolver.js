import _ from "lodash";
import { ExecutionArgs } from "../../def/executionArgs.js";
import { Provider } from "../../def/provider.js";
import compileTemplate from "../../utils/compileTemplate.js";
import path from "path"
import { SpecNotImplementedError } from "../../def/errors.js";
import { Builder } from "builder-pattern";
import randomName from "../../utils/randomName.js";

/**
* Description placeholder
*/
class ReturnSchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of ReturnSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {ExecutionArgs & { context: Object}} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {

        let contextTemplate;

        if (_.isString(context)) {
            contextTemplate = Builder(ReturnTemplateContext)
                .return(await this.provider.variableSchemaResolver.execute({ context, ...options }))
                .build()
            
        }
        else {
            const primaryVariableName = randomName();
            contextTemplate = Builder(ReturnTemplateContext)
                .preReturnOp(await this.provider.opSchemaResolver.execute({ context: context, ...options, primaryVariableName }))
                .return(primaryVariableName)
                .build()
        }

        return await compileTemplate(path.join(this.provider.schemaTemplate, `return.hbs`), contextTemplate)

    }
}

export default ReturnSchemaResolver


/**
* Description placeholder
*/
export class ReturnTemplateContext {


    /**
     * Description placeholder
     *
     * @type {string}
     */
    return


    /**
     * Description placeholder
     *
     * @type {string}
     */
    preReturnOp
}