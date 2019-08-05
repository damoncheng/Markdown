'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    formHelper = require('../helper/formHelper'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');


module.exports = function(group, element, translate, elementRegistry,
    qflow_modeler, qflow_arith) {

    var qflow_step_owner_default = qflow_modeler.qflow_basic.qflow_type.QFLOW_STEP_OWNER_DEFAULT,
        qflow_step_owner_creator = qflow_modeler.qflow_basic.qflow_type.QFLOW_STEP_OWNER_CREATOR,
        qflow_step_owner_creator_config = qflow_modeler.qflow_basic.qflow_type.QFLOW_STEP_OWNER_CREATOR_CONFIG,
        qflow_step_owner_role = qflow_modeler.qflow_basic.qflow_type.QFLOW_STEP_OWNER_ROLE,
        qflow_step_owner_ancestor_step_creator = qflow_modeler.qflow_basic.qflow_type.QFLOW_STEP_OWNER_ANCESTOR_STEP_CREATOR,
        qflow_step_owner_ancestor_step_owner = qflow_modeler.qflow_basic.qflow_type.QFLOW_STEP_OWNER_ANCESTOR_STEP_OWNER,
        qflow_step_owner_ancestor_field = qflow_modeler.qflow_basic.qflow_type.QFLOW_STEP_OWNER_ANCESTOR_FIELD;

    //获取元素父级元素步骤和字段
    var element_ancestor_list = qflow_arith.get_element_ancestor_list(element);
    var product_roles_dict = qflow_modeler.qflow_basic.product_roles;
    
    var is_task_owner_option = [];
    var step_owner_option = [];
    var rtx_field_option = [];
    var product_role_option = [];


    step_owner_option.push({name : "", value : ""});
    rtx_field_option.push({name : "", value : ""});
    product_role_option.push({name : "", value : ""});

    for(let one_step_owner_type of qflow_modeler.qflow_basic.qflow_type.QFLOW_STEP_OWNER_LIST){

        is_task_owner_option.push({value : one_step_owner_type, name : qflow_modeler.qflow_basic.qflow_type.QFLOW_STEP_OWNER_DESCRIPTION[one_step_owner_type]})

    }

    for(let one_element of element_ancestor_list){

        var bo = getBusinessObject(one_element);

        if(bo.name)
            step_owner_option.push({name : bo.name, value : bo.id})

        var field_list = formHelper.getFormFields(one_element);

        for(let one_field of field_list){

            if(qflow_modeler.qflow_basic.qflow_type.QFLOW_STEP_OWNER_FIELD_TYPE.includes(one_field.field_type))
                rtx_field_option.push({ name : one_field.name, value : one_field.id })
        
        }

    }

    for(let one_product_role_id in product_roles_dict){

        product_role_option.push({name : product_roles_dict[one_product_role_id].name, value : one_product_role_id})

    }

    group.entries.push(entryFactory.selectBox({

        id : 'is_task_owner',
        description : '',
        label : '步骤责任人',
        modelProperty : 'is_task_owner',
        selectOptions : is_task_owner_option,
        set : function(element, values, node){
            console.log("is_task_owner : ", values);
            var commands = [];
            commands.push(cmdHelper.updateProperties(element, values));
            commands.push(cmdHelper.updateProperties(element, {is_task_owner_ref : ""}));
            return commands;
        },
        validate : function (element, values) {

            var _elementRegistry = elementRegistry;

            return {};
        }
    }));


    group.entries.push(entryFactory.selectBox({

        id : 'is_task_owner_ref_role',
        description : '',
        label : '角色选择',
        modelProperty : 'is_task_owner_ref',
        selectOptions : product_role_option,
        //emptyParameter : true,
        hidden: function(element, node) {
            var bo = getBusinessObject(element);
            return bo.is_task_owner != qflow_step_owner_role;
        }
    }));

    group.entries.push(entryFactory.selectBox({

        id : 'is_task_owner_ref_field',
        description : '',
        label : '依赖步骤',
        modelProperty : 'is_task_owner_ref',
        selectOptions : step_owner_option,
        //emptyParameter : true,
        hidden: function(element, node) {
            var bo = getBusinessObject(element);
            return  ![qflow_step_owner_ancestor_step_owner, qflow_step_owner_ancestor_step_creator].includes(bo.is_task_owner);
        }
    }));

    group.entries.push(entryFactory.selectBox({

        id : 'is_task_owner_ref_step',
        description : '',
        label : '依赖步骤字段',
        modelProperty : 'is_task_owner_ref',
        selectOptions : rtx_field_option,
        //emptyParameter : true,
        hidden: function(element, node) {
            var bo = getBusinessObject(element);
            return bo.is_task_owner != qflow_step_owner_ancestor_field;
        }

    }));

};