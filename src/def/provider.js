import CommandFileResolver from "../resolvers/project/commands/CommandFileResolver.js"
import EntitiesFileResolver from "../resolvers/project/entities/EntitiesFileResolver.js"
import MiscFileResolver from "../resolvers/project/MiscFileResolver.js"
import AggregateActionSchemaResolver from "../resolvers/schema/AggregateActionSchemaResolver.js"
import AggregateOpSchemaResolver from "../resolvers/schema/AggregateOpSchemaResolver.js"
import AggregateSchemaResolver from "../resolvers/schema/AggregateSchemaResolver.js"
import ConditionSchemaResolver from "../resolvers/schema/ConditionSchemaResolver.js"
import FindSchemaResolver from "../resolvers/schema/FindSchemaResolver.js"
import IfSchemaResolver from "../resolvers/schema/IfSchemaResolver.js"
import InvokeSchemaResolver from "../resolvers/schema/InvokeSchemaResolver.js"
import LetSchemaResolver from "../resolvers/schema/LetSchemaResolver.js"
import MapFieldsSchemaResolver from "../resolvers/schema/MapFieldsSchemaResolver.js"
import MatchSchemaResolver from "../resolvers/schema/MatchSchemaResolver.js"
import MethodSchemaResolver from "../resolvers/schema/MethodSchemaResolver.js"
import OpSchemaResolver from "../resolvers/schema/OpSchemaResolver.js"
import PropertySchemaResolver from "../resolvers/schema/PropertySchemaResolver.js"
import PushSchemaResolver from "../resolvers/schema/PushSchemaResolver.js"
import TypeDefaultSchemaResolver from "../resolvers/schema/TypeDefaultSchemaResolver.js"
import TypeSchemaResolver from "../resolvers/schema/TypeSchemaResolver.js"
import UnlessSchemaResolver from "../resolvers/schema/UnlessSchemaResolver.js"
import VariableSchemaResolver from "../resolvers/schema/VariableSchemaResolver.js"

/**
 * Defination for the container
 */
export class Provider {
    /**
     * Description placeholder
     * 
     * @type {AggregateSchemaResolver}
     */
    aggregateSchemaResolver

    /**
     * Description placeholder
     * 
     * @type {AggregateOpSchemaResolver}
     */
    aggregateOpSchemaResolver

    /**
     * Description placeholder
     *
     * @type {ConditionSchemaResolver}
     */
    conditionSchemaResolver

    /**
     * Description placeholder
     *
     * @type {FindSchemaResolver}
     */
    findSchemaResolver

    /**
     * Description placeholder
     *
     * @type {IfSchemaResolver}
     */
    ifSchemaResolver

    /**
     * Description placeholder
     *
     * @type {InvokeSchemaResolver}
     */
    invokeSchemaResolver

    /**
     * Description placeholder
     *
     * @type {LetSchemaResolver}
     */
    letSchemaResolver

    /**
     * Description placeholder
     *
     * @type {MapFieldsSchemaResolver}
     */
    mapFieldsSchemaResolver

    /**
     * Description placeholder
     *
     * @type {MatchSchemaResolver}
     */
    matchSchemaResolver

    /**
     * Description placeholder
     *
     * @type {OpSchemaResolver}
     */
    opSchemaResolver

    /**
     * Description placeholder
     *
     * @type {PushSchemaResolver}
     */
    pushSchemaResolver

    /**
     * Description placeholder
     *
     * @type {TypeSchemaResolver}
     */
    typeSchemaResolver

    /**
     * Description placeholder
     *
     * @type {TypeDefaultSchemaResolver}
     */
    typeDefaultSchemaResolver

    /**
     * Description placeholder
     *
     * @type {UnlessSchemaResolver}
     */
    unlessSchemaResolver

    /**
     * Description placeholder
     *
     * @type {VariableSchemaResolver}
     */
    variableSchemaResolver

    
    /**
     * Description placeholder
     *
     * @type {AggregateActionSchemaResolver}
     */
    aggregateActionSchemaResolver

    
    /**
     * Description placeholder
     *
     * @type {MethodSchemaResolver}
     */
    methodSchemaResolver

    
    /**
     * Description placeholder
     *
     * @type {PropertySchemaResolver}
     */
    propertySchemaResolver

    /**
     * Description placeholder
     *
     * @type {string}
     */
    schemaTemplate

    /**
     * Description placeholder
     *
     * @type {string}
     */
    projectTemplate

    
    /**
     * Description placeholder
     *
     * @type {CommandFileResolver}
     */
    commandFileResolver

    
    /**
     * Description placeholder
     *
     * @type {EntitiesFileResolver}
     */
    entitiesFileResolver

    
    /**
     * Description placeholder
     *
     * @type {MiscFileResolver}
     */
    miscFileResolver
}