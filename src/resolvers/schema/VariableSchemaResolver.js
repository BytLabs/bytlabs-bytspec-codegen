import { pascalCase } from "change-case"
import _ from "lodash"
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
* Description placeholder
*/
class VariableSchemaResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of VariableSchemaResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {VariableExecutionArgs} param
    * @returns {Promise<string>}
    * 
    */
    async execute({ context, ...options }) {
        const variableResolver = (specVariable) => {

            if (specVariable.includes("@identity.claims.sub")) {
                return `userContextProvider.GetUserId()`
            }

            if (specVariable.startsWith("@fields")) {
                return specVariable.split(".")
                    .slice(1)
                    .map(prop => pascalCase(prop))
                    .join(".")
            }

            if (specVariable.startsWith("@parameters")) {
                return specVariable.split(".")
                    .slice(1)
                    .map((prop, index) => index > 0 ? pascalCase(prop) : prop)
                    .join(".")
            }

            if (specVariable.startsWith("@let")) {
                return specVariable.split(".")
                    .slice(1)
                    .map((prop, index) => index > 0 ? pascalCase(prop) : prop)
                    .join(".")
            }

            if (specVariable.startsWith("@input")) {
                return specVariable.split(".")
                    .map(prop => pascalCase(prop))
                    .map(prop => prop.replace("@input", "input"))
                    .join(".")
            }
        }

        return variableResolver(context)
    }
}

export default VariableSchemaResolver


/**
* Description placeholder
*/
export class VariableExecutionArgs extends ExecutionArgs {

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    context
}
