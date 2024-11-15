/**
 * Defination for the resolver argument
 */
export class ExecutionArgs {

    /**
     * Contains information of executing BoundedContext
     * 
     * @type {Object}
     */
    boundedContext

    /**
     * Contains information of executing Domain object
     * 
     * @type {Object | undefined}
     */
    domainObject

    /**
     * Contains information of executing Command
     * 
     * @type {Object | undefined}
     */
    command

    
    /**
     * Description placeholder
     *
     * @type {string | undefined}
     */
    primaryVariableName
}