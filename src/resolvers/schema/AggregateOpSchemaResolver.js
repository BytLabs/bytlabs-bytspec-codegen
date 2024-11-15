import _ from "lodash"
import compileTemplate from '../../utils/compileTemplate.js';
import { Builder } from 'builder-pattern';
import path from "path"
import { AggregateSchema } from "../../schema.js";
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
 * Contains the core logic for creating an instance of an aggregate.
 * 
 * This method handles the instantiation of an aggregate, ensuring the correct 
 * approach is used based on the scenario. It supports multiple methods of 
 * aggregate creation, including:
 * 
 * 1. **Retrieving from the repository**: If the aggregate already exists in the repository,
 *    it will be fetched and returned.
 * 2. **Instantiating via a factory method**: If no instance is found, the method will
 *    use a predefined factory method to create a new instance.
 * 3. **Using a constructor**: Alternatively, a constructor can be used to instantiate
 *    the aggregate directly.
 * 
 * ### Purpose
 * - Ensures that aggregates are created consistently according to the domain layer rules.
 * - Allows flexibility in how aggregates are instantiated, whether from a repository,
 *   a factory method, or via a constructor.
 * 
 * ### Template Details
 * - Utilizes the `aggregateOps/${opKey}.hbs` template to generate the necessary code.
 * - Passes `AggregateOpTemplateContext` as the template context, providing relevant metadata and
 *   configuration for the generated code to function according to the aggregate's schema.
 * 
 * @see AggregateOpTemplateContext
 * 
 */

class AggregateOpSchemaResolver {

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
     * @param {AggregateOpExecutionArgs} param
     * @returns {Promise<string>}
     * 
     */
    async execute ({ context, ...options }) {

        const opKey = _.chain(context)
                            .pick(['findOne', "deleteOne", "fromObject"])   
                            .keys()              
                            .first()
                            .value();

        //build context
        const findOne = context.findOne? Builder(AggregateOpTemplateContextFindOne)
                                            .predicate(await this.provider.matchSchemaResolver.execute({ context: context.findOne, ...options }))
                                            .build() : null;

        const opContext = Builder(AggregateOpTemplateContext)
                            .name(_.last(context.type.split("/")))
                            .findOne(findOne)
                            .build()

        //parse template
        return await compileTemplate(path.join(this.provider.schemaTemplate, `aggregateOps/${opKey}.hbs`), opContext)
    }
}

export default AggregateOpSchemaResolver;



/**
* Description placeholder
*/
export class AggregateOpExecutionArgs extends ExecutionArgs
{

    
    /**
     * Description placeholder
     *
     * @type {AggregateSchema}
     */
    context  
    
}


/**
 * This class contains details to retreive/instantiate an aggregate instance
 */
export class AggregateOpTemplateContext {

    /**
     * Name of aggregate
     * @type {string}
     */
    name

    /**
     * FindOne method details
     * @type {AggregateOpTemplateContextFindOne}
     */
    findOne
}

/**
 * This class contains details to retreive an aggregate instance
 */
export class AggregateOpTemplateContextFindOne {

    /**
     * Predicate to be passed in findOne method
     * @type {string}
     */
    predicate
}
