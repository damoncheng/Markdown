'use strict';

var cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper');
var approvalHelper = require('../helper/approvalHelper');
var extensionElements = require('bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/ExtensionElements');
var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

module.exports = function(group, element, translate, elementRegistry) {

    group.entries.push(entryFactory.textBox({

        id : 'form-manual-task',
        description : '',
        label : '步骤成功选项',
        modelProperty : 'success',
    
        get: function(element, node) {

            console.log("approval");
            return "success"

        },
      
        set: function(element, properties, node) {

            console.log("#-----approval : ", element);

            
        },
    
       // show: function(element, node) {
       //     return !!getSelectedFormField(element, node);
       //}
    
    }));

};