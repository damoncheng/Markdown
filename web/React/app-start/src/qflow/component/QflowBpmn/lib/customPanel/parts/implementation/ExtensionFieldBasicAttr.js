'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements,
    elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');


module.exports = function(extension_name, extension_field_list, extension_label, default_name, group, element, bpmnFactory, translate){

    group.entries.push(entryFactory.label({
        id: extension_name + '_basic_option',
        labelText: translate(extension_label),
    }));


    if(extension_field_list.includes("name")){

        group.entries.push(entryFactory.textBox({

            id : extension_name + '_field_name',
            description : '',
            label : '字段名',
            modelProperty : 'name',

            get: function(element, node) {

                var bo = getBusinessObject(element);

                var gatewayData = getExtensionElements(bo, extension_name);
            
                if (typeof gatewayData !== 'undefined') {
                return {name : gatewayData[0].name};
                }
                else
                { 
                    return {name : default_name};
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

                var qflowGateway = getExtensionElements(bo, extension_name);

                if (!qflowGateway) {
                    var qflowGateway = elementHelper.createElement(extension_name, values, extensionElements, bpmnFactory);
                    commands.push(cmdHelper.addAndRemoveElementsFromList(
                        element,
                        extensionElements,
                        'values',
                        'extensionElements',
                        [qflowGateway],
                        []
                    ));
                }
                else{
                    commands.push(cmdHelper.updateBusinessObject(element, qflowGateway[0], values));
                }
                

                return commands;
                
            }
            
        }));
    
    }


    if(extension_field_list.includes("link")){

        group.entries.push(entryFactory.textBox({

            id : extension_name + '_field_link',
            description : '',
            label : '字段链接',
            modelProperty : 'link',

            get: function(element, node) {

                var bo = getBusinessObject(element);

                var gatewayData = getExtensionElements(bo, extension_name);
            
                if (typeof gatewayData !== 'undefined') {
                return {link : gatewayData[0].link};
                }
                else
                { 
                    return {};
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

                var qflowGateway = getExtensionElements(bo, extension_name);

                if (!qflowGateway) {
                    var qflowGateway = elementHelper.createElement(extension_name, values, extensionElements, bpmnFactory);
                    commands.push(cmdHelper.addAndRemoveElementsFromList(
                        element,
                        extensionElements,
                        'values',
                        'extensionElements',
                        [qflowGateway],
                        []
                    ));
                }
                else{
                    commands.push(cmdHelper.updateBusinessObject(element, qflowGateway[0], values));
                }
                

                return commands;
                
            }
            
        }));
    
    }
    


}