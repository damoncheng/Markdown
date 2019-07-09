'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements,
    elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');


module.exports = function(extension_name, extension_field_list, extension_label, group, element, bpmnFactory, translate){

    group.entries.push(entryFactory.label({
        id: extension_name + '_assist_option',
        labelText: translate(extension_label),
    }));

    if(extension_field_list.includes("is_required"))
    {

        group.entries.push(entryFactory.checkbox({

            id : extension_name + '_is_required',
            description : '',
            label : '必填',
            modelProperty : 'is_required',

            get: function(element, node) {

                var bo = getBusinessObject(element);

                var extensionData = getExtensionElements(bo, extension_name);
            
                if (typeof extensionData !== 'undefined') {
                return {is_required : extensionData[0].is_required};
                }
                else
                { 
                    return {is_required : true};
                }
        
            },
        
            set: function(element, values, node) {

                var bo = getBusinessObject(element),
                    commands = [];

                values['is_required'] = !!values['is_required'];

                var extensionElements = bo.get('extensionElements');

                if(!extensionElements){
                    extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
                    commands.push(cmdHelper.updateBusinessObject(element, bo, { extensionElements: extensionElements }));
                }

                var qflowSubprocess = getExtensionElements(bo, extension_name);

                if (!qflowSubprocess) {
                    var qflowSubprocess = elementHelper.createElement(extension_name, values, extensionElements, bpmnFactory);
                    commands.push(cmdHelper.addAndRemoveElementsFromList(
                        element,
                        extensionElements,
                        'values',
                        'extensionElements',
                        [qflowSubprocess],
                        []
                    ));
                }
                else{
                    commands.push(cmdHelper.updateBusinessObject(element, qflowSubprocess[0], values));
                }
                

                return commands;
                
            }
            
        }));

    }

    if(extension_field_list.includes("is_on_apply_fill")){

        group.entries.push(entryFactory.checkbox({

            id : extension_name + '_is_on_apply_fill',
            description : '',
            label : '回写',
            modelProperty : 'is_on_apply_fill',
    
            get: function(element, node) {
    
                var bo = getBusinessObject(element);
    
                var subProcessData = getExtensionElements(bo, extension_name);
              
                if (typeof subProcessData !== 'undefined') {
                   return {is_on_apply_fill : subProcessData[0].is_on_apply_fill};
                }
                else
                { 
                    return {is_on_apply_fill : false};
                }
          
            },
          
            set: function(element, values, node) {
    
                var bo = getBusinessObject(element),
                    commands = [];
    
                values['is_on_apply_fill'] = !!values['is_on_apply_fill'];
    
                var extensionElements = bo.get('extensionElements');
    
                if(!extensionElements){
                    extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
                    commands.push(cmdHelper.updateBusinessObject(element, bo, { extensionElements: extensionElements }));
                }
    
                var qflowSubprocess = getExtensionElements(bo, extension_name);
    
                if (!qflowSubprocess) {
                    var qflowSubprocess = elementHelper.createElement(extension_name, values, extensionElements, bpmnFactory);
                    commands.push(cmdHelper.addAndRemoveElementsFromList(
                        element,
                        extensionElements,
                        'values',
                        'extensionElements',
                        [qflowSubprocess],
                        []
                    ));
                }
                else{
                    commands.push(cmdHelper.updateBusinessObject(element, qflowSubprocess[0], values));
                }
                
    
                return commands;
                
            }
            
        }));


    }

    


}