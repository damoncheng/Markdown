'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements,
    elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');
var ServiceTaskToolType = require('./implementation/ToolType'),
    ServiceTaskTool = require('./implementation/Tool');

var utils = require('../Utils');
var renderLabel = require('./implementation/RenderLabel');


function getElementToolId(element){

    var bo = getBusinessObject(element);

    var serviceTask = getExtensionElements(bo, 'qflow:ServiceTask');

    if (typeof serviceTask !== 'undefined') {
        return serviceTask[0].tool_id
    }

    return ""

}

module.exports = function(group, element, bpmnFactory, translate, elementRegistry, qflow_modeler, qflow_arith) {

    var qflow_type = qflow_modeler.qflow_basic.qflow_type;

    var qflow_tool_type_id = "tool_type";
    var qflow_product_tool_id = "product_tool_id";
    var qflow_system_tool_id = "system_tool_id";
    var qflow_product_tool_type = qflow_type.QFLOW_PRODUCT_TOOL_TYPE;
    var qflow_system_tool_type = qflow_type.QFLOW_SYSTEM_TOOL_TYPE;

    var tools = qflow_modeler.qflow_basic.tools;
    var selected_tool_id = getElementToolId(element);

    
    var porduct_tools = []
    var system_tools = []

    for(let one_tool_id in tools){

        if(parseInt(tools[one_tool_id].core_level) == parseInt(qflow_product_tool_type)){
            porduct_tools.push({name : tools[one_tool_id].name, value : one_tool_id});
        }
        else if(parseInt(tools[one_tool_id].core_level) == parseInt(qflow_system_tool_type))
        {
            system_tools.push({name : tools[one_tool_id].name, value : one_tool_id});
        }
    }

    
    var get_tool_id = function(element){

        var tool_id = "";

        var tool_type_node = utils.getToolType(element, qflow_tool_type_id);

        if(tool_type_node){

            var tool_type = tool_type_node.value;

            if(tool_type == qflow_product_tool_type){

                tool_id = utils.getTool(element, qflow_product_tool_id);

            }
            else if(tool_type == qflow_system_tool_type)
            {

                tool_id = utils.getTool(element, qflow_system_tool_id);

            }
        }

        return tool_id;

    }

    var check_tool_exist = function(element, node){

        var tool_id = get_tool_id(element);

        //console.log("tool_id : ", tool_id);

        if(tool_id && (tool_id in tools))
            return true;

        //console.log("tool_result : ", tool_result);

        return false;

    }

    group.entries.push(ServiceTaskToolType(element, bpmnFactory, {
        id : qflow_tool_type_id,
        description : '',
        label : '工具类型',
        modelProperty : qflow_tool_type_id,
        selectOptions : [
            {name : "产品工具", value : qflow_product_tool_type},
            {name : "系统工具", value : qflow_system_tool_type}
        ],
        set : function(element, values, node){

            console.log("tool type values", values);
    
            var tool_type = values[qflow_tool_type_id];
            var tool_id = "";

            if(parseInt(tool_type) == parseInt(qflow_product_tool_type)){
                tool_id = utils.getTool(element, qflow_product_tool_id);
            }
            else if(parseInt(tool_type) == parseInt(qflow_system_tool_type)){
                tool_id = utils.getTool(element, qflow_system_tool_id);
            }

            if(qflow_modeler.debug)
            {
                console.log("tool_type : ", tool_type);
                console.log("qflow_product_tool_type : ", qflow_product_tool_type);
                console.log("qflow_system_tool_type : ", qflow_system_tool_type);
                console.log("before values : ", values);
            }

            values = {tool_id : tool_id};

            if(qflow_modeler.debug)
                console.log("after values : ", values);

            var bo = getBusinessObject(element),
                commands = [];

            var extensionElements = bo.get('extensionElements');

            if(!extensionElements){
                extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
                commands.push(cmdHelper.updateBusinessObject(element, bo, { extensionElements: extensionElements }));
            }

            var qflowService = getExtensionElements(bo, 'qflow:ServiceTask');

            if (!qflowService) {
                var qflowService = elementHelper.createElement('qflow:ServiceTask', values, extensionElements, bpmnFactory);
                commands.push(cmdHelper.addAndRemoveElementsFromList(
                    element,
                    extensionElements,
                    'values',
                    'extensionElements',
                    [qflowService],
                    []
                ));
            }
            else{
                commands.push(cmdHelper.updateBusinessObject(element, qflowService[0], values));
            }
            

            return commands;

        },

        selected : function(option_value){

            if(selected_tool_id && 
              (selected_tool_id in tools) &&
              (tools[selected_tool_id].core_level == option_value)){
                  return true;
              }

            return false;

        }
    }, translate));


    group.entries.push(ServiceTaskTool(element, bpmnFactory, {

        id : qflow_product_tool_id,
        description : '',
        label : '产品工具选择',
        modelProperty : qflow_product_tool_id,
        selectOptions : porduct_tools,
        emptyParameter : true,
        hidden : function(element, node){

            var current_tool_type = qflow_product_tool_type;
            var tool_type_node = utils.getToolType(element, qflow_tool_type_id);

            if(tool_type_node != null){
                current_tool_type = tool_type_node.value;
            }
            
            return !(parseInt(qflow_product_tool_type) == parseInt(current_tool_type));

        },
        set : function(element, values, node) {
    
            //console.log("values : ", values);
        
            var tool_id = values[qflow_product_tool_id];
        
            values = {tool_id : tool_id};
        
            var bo = getBusinessObject(element),
                commands = [];
        
            var extensionElements = bo.get('extensionElements');
        
            if(!extensionElements){
                extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
                commands.push(cmdHelper.updateBusinessObject(element, bo, { extensionElements: extensionElements }));
            }
        
            var qflowService = getExtensionElements(bo, 'qflow:ServiceTask');
        
            if (!qflowService) {
                var qflowService = elementHelper.createElement('qflow:ServiceTask', values, extensionElements, bpmnFactory);
                commands.push(cmdHelper.addAndRemoveElementsFromList(
                    element,
                    extensionElements,
                    'values',
                    'extensionElements',
                    [qflowService],
                    []
                ));
            }
            else{
                commands.push(cmdHelper.updateBusinessObject(element, qflowService[0], values));
            }
            
        
            return commands;
        
        
          },
          selected : function(option_value){

            if(selected_tool_id && selected_tool_id == option_value){
                  return true;
            }

            return false;

          }
        
    }, translate));

    group.entries.push(ServiceTaskTool(element, bpmnFactory,{

        id : qflow_system_tool_id,
        description : '',
        label : '系统工具选择',
        modelProperty : qflow_system_tool_id,
        selectOptions : system_tools,
        emptyParameter : true,
        hidden : function(element, node){

            var current_tool_type = qflow_product_tool_type;
            var tool_type_node = utils.getToolType(element, qflow_tool_type_id);

            if(tool_type_node != null){
                current_tool_type = tool_type_node.value;
            }
            
            return !(parseInt(qflow_system_tool_type) == parseInt(current_tool_type));

        },
        set : function(element, values, node) {
    
            //console.log("values : ", values);
        
            var tool_id = values[qflow_system_tool_id];
        
            values = {tool_id : tool_id};
        
            var bo = getBusinessObject(element),
                commands = [];
        
            var extensionElements = bo.get('extensionElements');
        
            if(!extensionElements){
                extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
                commands.push(cmdHelper.updateBusinessObject(element, bo, { extensionElements: extensionElements }));
            }
        
            var qflowService = getExtensionElements(bo, 'qflow:ServiceTask');
        
            if (!qflowService) {
                var qflowService = elementHelper.createElement('qflow:ServiceTask', values, extensionElements, bpmnFactory);
                commands.push(cmdHelper.addAndRemoveElementsFromList(
                    element,
                    extensionElements,
                    'values',
                    'extensionElements',
                    [qflowService],
                    []
                ));
            }
            else{
                commands.push(cmdHelper.updateBusinessObject(element, qflowService[0], values));
            }
            
        
            return commands;
        
        
        },
        selected : function(option_value){

            if(selected_tool_id && selected_tool_id == option_value){
                  return true;
            }

            return false;

        }
        
    }, translate));

    group.entries.push(entryFactory.label({

        id : "qflow_tool_params_label",
        labelText : '工具参数',
        description : '',
        modelProperty : "qflow_tool_params_label",
        showLabel : check_tool_exist
        
    }));

    group.entries.push(renderLabel({

        id : "qflow_tool_params",
        description : '',
        modelProperty : "qflow_tool_params",
        render : function(element, node){
            
            var params_text = "";

            var tool_id = get_tool_id(element);

            if(tool_id && (tool_id in tools)){

                var params_list = [];

                for(let one_param of tools[tool_id]["params"]){

                    //params_text += '<li>' + one_param.name + '</li>'
                    params_list.push(one_param.name);

                }

                var params_dict = qflow_arith.get_rendered_element_params(element, params_list);

                for(let one_param in params_dict){
                    params_text += params_dict[one_param]
                }

            }

            return params_text;
        },
        showLabel : check_tool_exist
        
    }));


};