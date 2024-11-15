import { pascalCase } from "change-case"
import _ from "lodash"
import { TypeSchema } from "../../schema.js";
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
* Description placeholder
*/
class TypeDefaultSchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of TypeDefaultSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {TypeDefaultExecutionArgs} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        const defaultValueResolver = async (type, items) => {
            if (type && type.startsWith("#")) {
                const typeName = _.last(type.split("/"))
                return `new ${pascalCase(typeName)}()`
            }

            switch (type) {
                case "number":
                    return "0";
                case "text":
                case "string":
                    return "string.Empty"
                case "date":
                    return "DateTime.Now()"
                case "boolean":
                    return "false"
                case "void":
                    return "null"
                case "collection":
                    return `new List<${await this.provider.typeSchemaResolver.execute(items)}>()`
                default:
                    return `new ${type}()`;
            }
        }

        //parse template
        return await defaultValueResolver(context.type, context.items)
    }
}

export default TypeDefaultSchemaResolver





/**
* Description placeholder
*/
export class TypeDefaultExecutionArgs extends ExecutionArgs {

    
    /**
     * Description placeholder
     *
     * @type {TypeSchema}
     */
    context
}
