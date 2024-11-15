import { pascalCase } from "change-case";
import { Provider } from "../../def/provider.js";
import { ExecutionArgs } from "../../def/executionArgs.js";

/**
* Description placeholder
*/
class MatchSchemaResolver {

  /**
  * Container
  * @type {Provider}
  */
  provider

  /**
  * Creates an instance of MatchSchemaResolver.
  * @param {Provider} provider
  */
  constructor(provider) {
    this.provider = provider;
  }

  /**
  * Generates code based on a given schema object, using a specified template.
  * @param {MatchExecutionArgs} param
  * @returns {Promise<string>}
  * 
  */
  async execute({ context, ...options }) {
    const operatorsMap = {
      "$eq": "==",
      "$ne": "!=",
      "$gt": ">",
      "$gte": ">=",
      "$lt": "<",
      "$lte": "<=",
      "$in": "Contains"
    };

    function parseField(field) {
      // Convert MongoDB's dot notation (e.g., "address.city") to C# nested property access
      return field.split('.').map((x, index) => index > 0 ? pascalCase(x) : x).join('.');
    }

    const parseCondition = async (key, condition) => {
      if (typeof condition === "object" && condition !== null) {
        const expressions = [];
        for (let [operator, value] of Object.entries(condition)) {
          if (operator === "$in") {
            expressions.push(`${parseField(key)}.${operatorsMap[operator]}(${await this.provider.variableSchemaResolver.execute({ context: value, ...options })})`);
          } else if (operatorsMap[operator]) {
            expressions.push(`${parseField(key)} ${operatorsMap[operator]} ${await this.provider.variableSchemaResolver.execute({ context: value, ...options })}`);
          }
        }
        return expressions.join(" && ");
      } else {
        return `${parseField(key)} == ${await this.provider.variableSchemaResolver.execute({ context: condition, ...options })}`;
      }
    }

    const parseLogicalOperator = async (operator, conditions) => {
      const expressions = conditions.map(condition => {
        return this.provider.matchSchemaResolver.execute({context: condition, ...options});  // Recursively parse each condition
      });
      const csharpOperator = operator === "$or" ? " || " : " && ";
      return `(${expressions.join(csharpOperator)})`;
    }

    const predicateClauses = [];
    for (let [key, value] of Object.entries(context)) {
      if (key === "$or" || key === "$and") {
        predicateClauses.push(await parseLogicalOperator(key, value));
      } else {
        predicateClauses.push(await parseCondition("x." + pascalCase(key), value));
      }
    }

    return "x => " + predicateClauses.join(" && ");
  }
}

export default MatchSchemaResolver

/**
* Description placeholder
*/
export class MatchExecutionArgs extends ExecutionArgs {

  
  /**
   * Description placeholder
   *
   * @type {Object}
   */
  context
}