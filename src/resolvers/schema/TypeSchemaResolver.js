import { pascalCase } from "change-case"
import _ from "lodash"
import { TypeSchema } from "../../schema.js";
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
* Description placeholder
*/
class TypeSchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of TypeSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {TypeExecutionArgs} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        const typeResolver = async (type, items) => {
            if (type && type.startsWith("#")) {
                const typeName = _.last(type.split("/"))
                return pascalCase(typeName)
            }

            switch (type) {
                case "number":
                    return "double";
                case "text":
                case "string":
                    return "string"
                case "date":
                    return "DateTime"
                case "boolean":
                    return "bool"
                case "void":
                    return "void"
                case "collection":
                    return `ICollection<${await typeResolver(items)}>`
                default:
                    return type;
            }
        }

        //parse template
        return await typeResolver(context.type, context.items)
    }
}

export default TypeSchemaResolver



/**
* Description placeholder
*/
export class TypeExecutionArgs extends ExecutionArgs {
  
    
    /**
     * Description placeholder
     *
     * @type {TypeSchema}
     */
    context
}