'use strict';

var domify = require('min-dom').domify,
    domClear = require('min-dom').clear;

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements,
    elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');
    
var renderLabel = require('./implementation/RenderLabel');
var extensionFieldAssistAttr = require("./implementation/ExtensionFieldAssistAttr");
var extensionFieldBasicAttr = require("./implementation/ExtensionFieldBasicAttr");


module.exports = function(group, element, bpmnFactory, translate, elementRegistry, qflow_modeler, qflow_arith) {

    extensionFieldBasicAttr(
        'qflow:ParallelGateway', 
        ["name"],
        '分支基本属性',
        '分支',
        group,
        element,
        bpmnFactory,
        translate
    );


    group.entries.push(entryFactory.label({

        id : "parallelgateway-branch-label",
        labelText : '步骤当前分支',
        description : '',
        modelProperty : "parallelgateway-branch-label",
        
    }));

    group.entries.push(renderLabel({

        id : "parallelgateway-branch",
        description : '',
        modelProperty : "parallelgateway-branch",
        render : function(element, node){
  
            var params_text = "";
            var branch_shape_li_list = qflow_arith.get_element_branch_li(element);

            if(branch_shape_li_list.length > 0){
  
              for(let one_li of branch_shape_li_list){
                  params_text += one_li;
              }
  
            }
  
            return params_text;
        },
        
    }));

    extensionFieldAssistAttr(
        'qflow:ParallelGateway', 
        ["is_required", "is_on_apply_fill"],
        '分支辅助属性',
        group,
        element,
        bpmnFactory,
        translate
    );

};