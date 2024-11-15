import _ from "lodash"
import compileTemplate from '../../utils/compileTemplate.js';
import { Builder } from 'builder-pattern';
import path from "path"
import { MapFieldsSchema } from "../../schema.js";
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";
import unwrapObj from "../../utils/unwrapObj.js";

/**
* Description placeholder
*/
class MapFieldsSchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of MapFieldsSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {MapFieldsExecutionArgs} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        if(!options.domainObject && !options.domainObject.properties) throw new Error("'mapField' only works with domain objects for field mapping");

            const props = await Promise.all(_.chain(unwrapObj(options.domainObject.properties))
                                                .omit(context.omit || [])
                                                .map(async field => await this.provider.propertySchemaResolver.execute({ context: field.name, ...options }))
                                                .value());

            const invokeContext = Builder(MapFieldsTemplateContext)
                .source(await this.provider.variableSchemaResolver.execute({ context: context.from, ...options }))
                .props(props)
                .build()

            return await compileTemplate(path.join(this.provider.schemaTemplate, `mapField.hbs`), invokeContext)
    }
}

export default MapFieldsSchemaResolver



/**
* Description placeholder
*/
export class MapFieldsExecutionArgs extends ExecutionArgs {
    
    /**
     * Description placeholder
     *
     * @type {MapFieldsSchema}
     */
    context
}

/**
* Description placeholder
*/
class MapFieldsTemplateContext {

    /**
    * Description placeholder
    */
    source

    /**
    * Description placeholder
    */
    dest

    /**
    * Description placeholder
    */
    props
}


