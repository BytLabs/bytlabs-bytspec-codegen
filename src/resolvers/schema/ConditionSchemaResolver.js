import _ from "lodash"
import compileTemplate from '../../utils/compileTemplate.js';
import { Builder } from 'builder-pattern';
import path from "path"
import { ConditionSchema } from "../../schema.js";
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
 * Resolver for evaluating condition schemas.
 * 
 * This resolver is responsible for processing a condition block that may contain
 * multiple methods to evaluate an expression. The result of the evaluation is a
 * boolean condition, which determines the flow of the program based on the logic
 * defined within the condition block.
 * 
 * 
 * ### Usage
 * - This resolver is primarily used by `IfSchemaResolver`, which leverages the condition
 *   to make decisions based on the outcome of the evaluation.
 * 
 * ### Purpose
 * - To allow flexible condition evaluation within schema-driven logic.
 * - To integrate condition schemas seamlessly with other parts of the application.
 * 
 * ### Template Details
 * - The resolver utilizes the template located at `conditions/${opKey}.hbs`.
 * - The template is populated using `ConditionTemplateContext`, which provides
 *   the necessary context and data for evaluating the condition.
 * 
 * @see ConditionTemplateContext
 * @see IfSchemaResolver
 */
class ConditionSchemaResolver {
    /**
      * Container
      * @type {Provider}
      */
    provider


    /**
     * Creates an instance of SchemaAggregateResolver.
     * @param {Provider} provider
     */
    constructor(provider) {
        this.provider = provider;
    }

    /**
     * Generates code based on a given schema object, using a specified template.
     * @param {ConditionExecutionArgs} param
     * @returns {Promise<string>}
     * 
     */
    async execute({ context, ...options }) {

        const opKey = _.chain(context)
            .pick(['isEmpty', 'not'])
            .keys()
            .first()
            .value();

        //build context
        const variable = context.isEmpty ? Builder(ConditionTemplateContextVariable)
            .name(await this.provider.variableSchemaResolver.execute({ context: context.isEmpty, ...options }))
            .build() : null;

        const not = context.not ? Builder(ConditionTemplateContextNot)
            .expression(await this.provider.conditionSchemaResolver.execute({ context: context.not, ...options }))
            .build() : null;

        const conditionContext = Builder(ConditionTemplateContext)
            .variable(variable)
            .not(not)
            .build()

        //parse template
        return await compileTemplate(path.join(this.provider.schemaTemplate, `conditions/${opKey}.hbs`), conditionContext)
    }
}

export default ConditionSchemaResolver;





/**
* Description placeholder
*/
export class ConditionExecutionArgs extends ExecutionArgs {

    /**
     * Description placeholder
     *
     * @type {ConditionSchema}
     */
    context
    
}



/**
 * This class contains details to evaluate condition block
 */
export class ConditionTemplateContext {
    /**
     * Contains info to evaluate a variable
     * @type {ConditionTemplateContextVariable}
     */
    variable
    /**
     * Contains info to invert a evaluated expression
     * @type {ConditionTemplateContextNot}
     */
    not
}

/**
 * This class contains details to evaluate a variable state
 */
export class ConditionTemplateContextVariable {

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    name;
}

/**
 * This class contains details to invert an expression
 */
export class ConditionTemplateContextNot {

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    expression
}