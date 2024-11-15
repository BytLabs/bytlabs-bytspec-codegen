/**
* Description placeholder
*/
export class TypeSchema {

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    type

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    items
}


/**
* Description placeholder
*/
export class CommandSchema  {


    /**
     * Description placeholder
     *
     * @type {*}
     */
    execute

    /**
     * Description placeholder
     *
     * @type {Object<string, CommandInputSchema>}
     */
    input


    /**
     * Description placeholder
     *
     * @type {string}
     */
    returns

}


/**
* Description placeholder
*/
export class CommandInputSchema extends TypeSchema {


    /**
     * Description placeholder
     *
     * @type {string}
     */
    hasPropertiesOf


    /**
     * Description placeholder
     *
     * @type {string[]}
     */
    except


    /**
     * Description placeholder
     *
     * @type {Object<string, CommandInputSchema>}
     */
    with
}

/**
* Description placeholder
*/
export class EntitySchema {

    /**
     * Description placeholder
     *
     * @type {Object<string, TypeSchema>}
     */
    properties

    
    /**
     * Description placeholder
     *
     * @type {Object[]}
     */
    actions

    
    /**
     * Description placeholder
     *
     * @type {boolean}
     */
    aggregate
}


/**
* Description placeholder
*/
export class ConditionSchema {

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    isEmpty

    
    /**
     * Description placeholder
     *
     * @type {ConditionSchema}
     */
    not    
}

/**
* Description placeholder
*/
export class FindSchema {

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    in

    
    /**
     * Description placeholder
     *
     * @type {Object}
     */
    where
}

/**
* Description placeholder
*/
export class IfSchema {

    
    /**
     * Description placeholder
     *
     * @type {ConditionSchema}
     */
    condition

    
    /**
     * Description placeholder
     *
     * @type {Object}
     */
    then
}

/**
* Description placeholder
*/
export class UnlessSchema {

    
    /**
     * Description placeholder
     *
     * @type {ConditionSchema}
     */
    condition

    
    /**
     * Description placeholder
     *
     * @type {Object}
     */
    then

}

/**
* Description placeholder
*/
export class InvokeMethodSchema {

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    name

    
    /**
     * Description placeholder
     *
     * @type {string[]}
     */
    parameters
}

/**
* Description placeholder
*/
export class InvokeSchema {

    
    /**
     * Description placeholder
     *
     * @type {InvokeMethodSchema}
     */
    method

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    onTarget
}

/**
* Description placeholder
*/
export class MapFieldsSchema {

    
    /**
     * Description placeholder
     *
     * @type {string[]}
     */
    omit

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    from
}

/**
* Description placeholder
*/
export class PushSchema {

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    to

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    value
}

/**
* Description placeholder
*/
export class LastSchema {

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    in
}

/**
* Description placeholder
*/
export class AggregateSchema {

    
    /**
     * Description placeholder
     *
     * @type {AggregateActionSchema[]}
     */
    actions

    /**
     * Description placeholder
     *
     * @type {string}
     */
    type

    
    /**
     * Description placeholder
     *
     * @type {Object}
     */
    findOne
}

/**
 * This class contains method details to invoke on an aggregate instance
 */
export class AggregateActionSchema {
    /**
     * Domain object's action name
     * @type {string}
     */
    name
    /**
     * List of parameters to be passed in the invoking action
     * @type {string[]}
     */
    parameters
}