'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

module.exports = function(group, element, translate, elementRegistry) {

    group.entries.push(entryFactory.textField({
        id : 'submit_var_name',
        description : '',
        label : '步骤变量名',
        modelProperty : 'submit_var_name',
        validate : function(element, values){

            var _elementRegistry = elementRegistry;

            return {};
        }
    }));


};