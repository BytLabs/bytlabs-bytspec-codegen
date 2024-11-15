
import path from "path"
import _ from "lodash";
import unwrapObj from "../../../utils/unwrapObj.js";
import parseTemplateWithPath from "../../../utils/parseTemplateWithPath.js";
import { CommandExecutionArgs, CommandExecutionArgsDeps, CommandExecutionArgsSubType } from "./CommandExecutionArgs.js";
import {
    CommandInputClassTemplateContextClassProperty,
    CommandTemplateContext,
    CommandTemplateContextClass,
    CommandTemplateContextCommand,
    CommandTemplateContextCommandDep,
    CommandTemplateContextCommandInputProperty,
    CommandTemplateContextCommandSubType,
    CommandTemplateContextProject
} from "./CommandTemplateContext.js";
import { Builder } from "builder-pattern";
import { pascalCase } from "change-case";
import { CommandInputSchema, TypeSchema } from "../../../schema.js";
import { Provider } from "../../../def/provider.js";
import { FileResolverArgs } from "../../../def/fileResolverArgs.js";
import { ExecutionArgs } from "../../../def/executionArgs.js";

/**
* Description placeholder
*/
class CommandFileResolver {

    /**
    * Container
    * @type {Provider}
    */
    provider

    /**
    * Creates an instance of CommandFileResolver.
    * @param {Provider} provider
    */
    constructor(provider) {
        this.provider = provider;
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {FileResolverArgs} param
    * @returns {Promise}
    * 
    */
    async execute({ spec, outputDirectory }) {

        const sourceDirectory = this.provider.projectTemplate;

        for (let boundedContext of unwrapObj(spec.boundedContexts)) {

            const commandContexts = await Promise.all(unwrapObj(boundedContext.application.commands)
                .map(async command => await this.getCommandTemplateContext({ context: command, boundedContext, command, domainObject: null })))

            for (let commandContext of commandContexts) {
                const destinationDirectory = path.join(outputDirectory, commandContext.project.name);
                await parseTemplateWithPath(sourceDirectory, destinationDirectory, "Command.cs", commandContext);
            }
        }
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {CommandExecutionArgs} param
    * @returns {Promise<CommandTemplateContext>}
    * 
    */
    async getCommandTemplateContext({ context, ...options }) {


        const getSubTypes = async () => {
            const result = _.flatMap(await Promise.all(
                this.unwrapWith(context.input)
                    .map(async field => {
    
                        if (field.hasPropertiesOf) {
    
                            const subTypes = await this.getSubTypes({ context: field, classNamePrefix: pascalCase(context.name), classes: [], ...options })
    
                            return subTypes;
                        }
    
                        return []
                    })
            ))

            return result;
        }

        const repositoryTypes = _.chain(context.execute)
            .filter(op => op.aggregate || (op.let && op.let.aggregate))
            .map(op => op.aggregate ? op.aggregate.type : op.let.aggregate.type)
            .uniq()
            .value()


        return Builder(CommandTemplateContext)
            .project(Builder(CommandTemplateContextProject)
                .name(pascalCase(options.boundedContext.name))
                .build())
            .command(Builder(CommandTemplateContextCommand)
                .name(pascalCase(context.name))
                .properties(await this.getProperties({ context: context, ...options }))
                .subTypes(await getSubTypes())
                .returnType(context.returns ? await this.provider.typeSchemaResolver.execute({ context: { type: context.returns, items: null }, command: context, ...options }) : null)
                .body(await this.getBody({ context, ...options }))
                .deps(await this.getDeps({ context: { repositoryTypes }, command: context, ...options }))
                .build())
            .build()
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {CommandExecutionArgs} param
    * @returns {Promise<CommandTemplateContextCommandInputProperty[]>}
    * 
    */
    async getProperties({ context, ...options }) {
        return await Promise.all(this.unwrapWith(context.input)
            .map(async field => {

                let type = null;

                if (field.hasPropertiesOf) {

                    const subTypes = await this.getSubTypes({ context: field, classes:[], classNamePrefix: pascalCase(context.name), ...options })

                    type = _.last(subTypes).class.name;
                }
                else {
                    type = await this.provider.typeSchemaResolver.execute({ context: { type: field.type, items: field.items }, ...options })
                }

                return Builder(CommandTemplateContextCommandInputProperty)
                    .type(type)
                    .name(pascalCase(field.name))
                    .default(await this.provider.typeDefaultSchemaResolver.execute({ context: { type, items: null }, ...options }))
                    .build()
            }))
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {CommandExecutionArgsGetSubTypes} param
    * @returns {Promise<CommandTemplateContextCommandSubType[]>}
    * 
    */
    async getSubTypes({ context, classNamePrefix, classes, ...options }) {
        if (context.hasPropertiesOf) {

            const path = context.hasPropertiesOf.split("/").slice(1).join(".");
            const inlineClass = _.get(options.boundedContext, path);
            _.set(inlineClass, 'name', `${classNamePrefix}_${context.name}`);


            if (context.except) {
                inlineClass.properties = _.omit(inlineClass.properties, context.except)
            }


            if (context.with) {
                const nestedOtherClasses = await Promise.all(
                    this.unwrapWith(context.with)
                        .map(childContext => {
                            if (childContext.hasPropertiesOf) {
                                return this.getSubTypes(
                                    Builder(CommandExecutionArgsGetSubTypes)
                                        .context(childContext)
                                        .boundedContext(options.boundedContext)
                                        .classNamePrefix(pascalCase(context.name))
                                        .classes([])
                                        .build()
                                )
                            }

                            return null;

                        })
                        .filter(classes => !!classes)
                );

                const otherClasses = (_.flatMap(nestedOtherClasses));

                classes = [...classes, ...otherClasses]

            }

            var classContext = Builder(CommandExecutionArgsSubType)
                .name(inlineClass.name)
                .properties(inlineClass.properties)
                .build();

            return [...classes, await this.getSubType({ context: classContext, ...options })]

        }

        return classes;

        

    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {{ context: CommandExecutionArgsSubType} & ExecutionArgs} param
    * @returns {Promise<CommandTemplateContextCommandSubType>}
    * 
    */
    async getSubType({ context, ...options }) {
        const project = Builder(CommandTemplateContextProject)
            .name(pascalCase(options.boundedContext.name))
            .build();

        const properties = await Promise.all(this.unwrapProps(context.properties)
            .map(async field =>
                Builder(CommandInputClassTemplateContextClassProperty)
                    .type(await this.provider.typeSchemaResolver.execute({
                        context: field,
                        domainObject: context,
                        ...options
                    }))
                    .name(pascalCase(field.name))
                    .default(await this.provider.typeDefaultSchemaResolver.execute({
                        context: field,
                        domainObject: context,
                        ...options
                    }))
                    .build()
            ))

        const $class = Builder(CommandTemplateContextClass)
            .name(pascalCase(context.name))
            .properties(properties)
            .build();

        return Builder(CommandTemplateContextCommandSubType)
            .project(project)
            .class($class)
            .build();
    }

     /**
    * Generates code based on a given schema object, using a specified template.
    * @param {{context: CommandExecutionArgsDeps} & ExecutionArgs} param
    * @returns {Promise<CommandTemplateContextCommandDep[]>}
    * 
    */
    async getDeps({ context, ...options }) {
        const repositories = context.repositoryTypes.map(async type =>
            Builder(CommandTemplateContextCommandDep)
                .type(`IRepository<${await this.provider.typeSchemaResolver.execute({ context: { type, items: null }, ...options })}, string>`)
                .name(`${_.camelCase(await this.provider.typeSchemaResolver.execute({ context: { type, items: null }, ...options }))}Repository`)
                .build()
        );


        const userContextDep = Builder(CommandTemplateContextCommandDep)
            .type("IUserContextProvider")
            .name("userContextProvider")
            .build();

        return [userContextDep]
            .concat(await Promise.all(repositories))
    }

    /**
    * Generates code based on a given schema object, using a specified template.
    * @param {CommandExecutionArgs} param
    * @returns {Promise<string[]>}
    * 
    */
    async getBody({ context, ...options }) {
        return await Promise.all(context.execute.map(async op => await this.provider.opSchemaResolver.execute({ context: op, command: context, ...options })))
    }

    /**
     * Description placeholder
     *
     * @param {Object<string, CommandInputSchema>} obj
     * @returns {(CommandInputSchema & { name: string })[]}
     */
    unwrapWith(obj) {
        return unwrapObj(obj)
    }

    /**
     * Description placeholder
     *
     * @param {Object<string, TypeSchema>} obj
     * @returns {(TypeSchema & { name: string })[]}
     */
    unwrapProps(obj) {
        return unwrapObj(obj)
    }
}

export default CommandFileResolver

/**
* Description placeholder
*/
class CommandExecutionArgsGetSubTypes extends ExecutionArgs {


    /**
     * Description placeholder
     *
     * @type {CommandInputSchema & { name: string}}
     */
    context


    /**
     * Description placeholder
     *
     * @type {*}
     */
    boundedContext


    /**
     * Description placeholder
     *
     * @type {string}
     */
    classNamePrefix


    /**
     * Description placeholder
     *
     * @type {CommandTemplateContextCommandSubType[]}
     */
    classes
}

