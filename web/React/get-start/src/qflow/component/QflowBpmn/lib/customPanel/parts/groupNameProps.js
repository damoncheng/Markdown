'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

module.exports = function(group, element, translate, elementRegistry) {

    group.entries.push(entryFactory.textBox({
        id : 'group_name',
        description : '',
        label : '分组名',
        modelProperty : 'group_name',
        validate : function(element, values, entryNode){

            var _elementRegistry = elementRegistry;

            return {};
        }
    }));


};