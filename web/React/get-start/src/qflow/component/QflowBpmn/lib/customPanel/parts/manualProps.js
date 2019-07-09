'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements,
    elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');

module.exports = function(group, element, bpmnFactory, translate, elementRegistry) {

    group.entries.push(entryFactory.textBox({

        id : 'manuall-field-name',
        description : '',
        label : '审批字段名',
        modelProperty : 'name',

        get: function(element, node) {

            var bo = getBusinessObject(element);

            var manualData = getExtensionElements(bo, 'qflow:ManualTask');
          
            if (typeof manualData !== 'undefined') {
                //console.log(manualData[0].success)
               return {name : manualData[0].name};
            }
            else
            { 
                return {name : "审批"};
            }
      
        },
      
        set: function(element, values, node) {

            var bo = getBusinessObject(element),
                commands = [];

            var extensionElements = bo.get('extensionElements');

            if(!extensionElements){
                extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
                commands.push(cmdHelper.updateBusinessObject(element, bo, { extensionElements: extensionElements }));
            }

            var qflowManual = getExtensionElements(bo, 'qflow:ManualTask');

            if (!qflowManual) {
                var qflowManual = elementHelper.createElement('qflow:ManualTask', values, extensionElements, bpmnFactory);
                commands.push(cmdHelper.addAndRemoveElementsFromList(
                    element,
                    extensionElements,
                    'values',
                    'extensionElements',
                    [qflowManual],
                    []
                ));
            }
            else{
                commands.push(cmdHelper.updateBusinessObject(element, qflowManual[0], values));
            }
            

            return commands;
            
        },
        
        validate : function (element, values) {

            var _elementRegistry = elementRegistry;

            return {};
        }
    }));


    group.entries.push(entryFactory.textBox({

        
        id : 'success',
        description : '',
        label : '审批通过选项',
        modelProperty : 'success',

        get: function(element, node) {

            var bo = getBusinessObject(element);

            var manualData = getExtensionElements(bo, 'qflow:ManualTask');
          
            if (typeof manualData !== 'undefined') {
                //console.log(manualData[0].success)
               return {success : manualData[0].success};
            }
            else
            { 
                return {success : "通过"};
            }
      
        },
      
        set: function(element, values, node) {

            var bo = getBusinessObject(element),
                commands = [];

            var extensionElements = bo.get('extensionElements');

            if(!extensionElements){
                extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
                commands.push(cmdHelper.updateBusinessObject(element, bo, { extensionElements: extensionElements }));
            }

            var qflowManual = getExtensionElements(bo, 'qflow:ManualTask');

            if (!qflowManual) {
                var qflowManual = elementHelper.createElement('qflow:ManualTask', values, extensionElements, bpmnFactory);
                commands.push(cmdHelper.addAndRemoveElementsFromList(
                    element,
                    extensionElements,
                    'values',
                    'extensionElements',
                    [qflowManual],
                    []
                ));
            }
            else{
                commands.push(cmdHelper.updateBusinessObject(element, qflowManual[0], values));
            }
            

            return commands;
            
        },
        
        validate : function (element, values) {

            var _elementRegistry = elementRegistry;

            return {};
        }
    }));

    group.entries.push(entryFactory.textBox({

        id : 'fail',
        description : '',
        label : '审批不通过选项',
        modelProperty : 'fail',

        get: function(element, node) {

            var bo = getBusinessObject(element);

            var manualData = getExtensionElements(bo, 'qflow:ManualTask');
          
            if (typeof manualData !== 'undefined') {
               return {fail : manualData[0].fail};
            }
            else
            { 
                return {fail : "不通过"};
            }
      
        },
      
        set: function(element, values, node) {

            var bo = getBusinessObject(element),
                commands = [];

            var extensionElements = bo.get('extensionElements');

            if(!extensionElements){
                extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
                commands.push(cmdHelper.updateBusinessObject(element, bo, { extensionElements: extensionElements }));
            }

            var qflowManual = getExtensionElements(bo, 'qflow:ManualTask');

            if (!qflowManual) {
                var qflowManual = elementHelper.createElement('qflow:ManualTask', values, extensionElements, bpmnFactory);
                commands.push(cmdHelper.addAndRemoveElementsFromList(
                    element,
                    extensionElements,
                    'values',
                    'extensionElements',
                    [qflowManual],
                    []
                ));
            }
            else{
                commands.push(cmdHelper.updateBusinessObject(element, qflowManual[0], values));
            }
            

            return commands;
            
        },
        
        validate : function (element, values) {

            var _elementRegistry = elementRegistry;

            return {};
        }

    }));

};