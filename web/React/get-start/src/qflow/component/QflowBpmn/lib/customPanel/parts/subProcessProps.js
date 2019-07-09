'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements,
    elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');
var renderLabel = require('./implementation/RenderLabel');
var extensionFieldAssistAttr = require("./implementation/ExtensionFieldAssistAttr");
var extensionFieldBasicAttr = require("./implementation/ExtensionFieldBasicAttr");


module.exports = function(group, element, bpmnFactory, translate, elementRegistry, qflow_modeler, qflow_arith, qflow_render) {

    extensionFieldBasicAttr(
        'qflow:SubProcess', 
        ["name", "link"],
        '子流程基本属性',
        '子流程',
        group,
        element,
        bpmnFactory,
        translate
    );

    group.entries.push(entryFactory.label({

        id : "servicetask_subprocess_field_label",
        labelText : '当前可选子流程',
        description : '',
        modelProperty : "servicetask_subprocess_field_label",
        
    }));

    group.entries.push(renderLabel({

        id : "servicetask_subprocess_field",
        description : '',
        modelProperty : "servicetask_subprocess_field",
        render : function(element, node){
  
            var params_text = "";
            var sub_flows = qflow_modeler.qflow_basic.sub_flows;

            for(let one_sub_flow_id in sub_flows){

                params_text += qflow_render.render_li("", "", sub_flows[one_sub_flow_id].name);

            }
  
            return params_text;
        },
        
    }));

    
    extensionFieldAssistAttr(
        'qflow:SubProcess', 
        ["is_required", "is_on_apply_fill"],
        '子流程辅助属性',
        group,
        element,
        bpmnFactory,
        translate
    );

};