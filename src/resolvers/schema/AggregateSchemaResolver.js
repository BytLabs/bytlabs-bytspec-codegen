
import { Builder } from 'builder-pattern';
import path from "path"
import randomName from '../../utils/randomName.js';
import compileTemplate from '../../utils/compileTemplate.js';
import { AggregateActionSchema, AggregateSchema } from '../../schema.js';
import { Provider } from '../../def/provider.js';
import { ExecutionArgs } from '../../def/executionArgs.js';


/**
 * Resolves an aggregate schema object within the application.
 * 
 * This resolver defines the flow for retrieving an aggregate from the repository,
 * following the patterns established in the Domain-Driven Design (DDD) approach.
 * It facilitates actions on the aggregate, allowing for operations defined
 * in the domain layer to be applied effectively.
 * 
 * ### Purpose
 * - Retrieve a specific aggregate instance based on the provided criteria.
 * - Perform domain-specific operations on the aggregate, maintaining consistency
 *   and adhering to business rules as defined by the domain layer.
 * 
 * ### Template Details
 * - Utilizes the `aggregate.hbs` template to generate the necessary code.
 * - Passes `AggregateTemplateContext` as the template context, providing relevant metadata and
 *   configuration for the generated code to function according to the aggregate's schema.
 * 
 * @see AggregateTemplateContext
 * 
 */
class AggregateSchemaResolver {

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
     * @param {AggregateExecutionArgs} param
     * @returns {Promise<string>}
     * 
     */
    async execute({ context, ...options }) {

        //build context
        const actions = context.actions? await Promise.all(
            context.actions.map(async action =>
                Builder(AggregateActionSchema)
                    .name(await this.provider.aggregateActionSchemaResolver.execute({ context: action.name, ...options }))
                    .parameters(await Promise.all(
                        action.parameters.map(async param => 
                            await this.provider.variableSchemaResolver.execute({ context: param, ...options }))))
                    .build()
            )) : [];

        const aggregateContext = Builder(AggregateTemplateContext)
            .name(options.primaryVariableName || randomName())
            .op(await this.provider.aggregateOpSchemaResolver.execute({ context, ...options }))
            .actions(actions)
            .build()

        //parse template
        return await compileTemplate(path.join(this.provider.schemaTemplate, "aggregate.hbs"), aggregateContext)

    }
}

export default AggregateSchemaResolver;


/**
* Description placeholder
*/
export class AggregateExecutionArgs extends ExecutionArgs {

    
    /**
     * Description placeholder
     *
     * @type {AggregateSchema}
     */
    context
}


/**
 * This class contains details to retreive and perfrom operation on an aggregate
 */
export class AggregateTemplateContext {
    /**
     * Variable name for aggregate instance
     * @type {string}
     */
    name
    /**
     * Operation to retreive aggregate instance
     * @type {string}
     */
    op
    /**
     * List of actions to perform on aggregate instance
     * @type {AggregateActionSchema[]}
     */
    actions
}


