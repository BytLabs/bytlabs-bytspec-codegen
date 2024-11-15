/**
* Description placeholder
*/
export class CommandTemplateContext {


    /**
     * Description placeholder
     *
     * @type {CommandTemplateContextProject}
     */
    project


    /**
     * Description placeholder
     *
     * @type {CommandTemplateContextCommand}
     */
    command
}


/**
* Description placeholder
*/
export class CommandTemplateContextProject {

    /**
     * Description placeholder
     *
     * @type {string}
     */
    name
}



/**
 * Description placeholder
 */
export class CommandTemplateContextCommand {


    /**
     * Description placeholder
     *
     * @type {string}
     */
    name


    /**
     * Description placeholder
     *
     * @type {CommandTemplateContextCommandInputProperty[]}
     */
    properties


    /**
     * Description placeholder
     *
     * @type {CommandTemplateContextCommandSubType[]}
     */
    subTypes

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    returnType

    
    /**
     * Description placeholder
     *
     * @type {string[]}
     */
    body


    /**
     * Description placeholder
     *
     * @type {CommandTemplateContextCommandDep[]}
     */
    deps
}

/**
* Description placeholder
*/
export class CommandTemplateContextCommandInputProperty {

    
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
    name

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    default
}

export class CommandTemplateContextCommandSubType {

    
    /**
     * Description placeholder
     *
     * @type {CommandTemplateContextProject}
     */
    project

    
    /**
     * Description placeholder
     *
     * @type {CommandTemplateContextClass}
     */
    class
}



/**
* Description placeholder
*/
export class CommandTemplateContextClass {

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    name;

    
    /**
     * Description placeholder
     *
     * @type {CommandInputClassTemplateContextClassProperty[]}
     */
    properties
}

/**
* Description placeholder
*/
export class CommandInputClassTemplateContextClassProperty {

    
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
    name

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    default
}

/**
* Description placeholder
*/
export class CommandTemplateContextCommandDep {

    /**
     * Description placeholder
     */
    type

    /**
     * Description placeholder
     */
    name  
}
