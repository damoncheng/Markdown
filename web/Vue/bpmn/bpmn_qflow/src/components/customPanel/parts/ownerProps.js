'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

module.exports = function(group, element, translate, elementRegistry) {

    group.entries.push(entryFactory.textBox({
        id : 'owner',
        description : '',
        label : '默认步骤责任人',
        modelProperty : 'owner',
        validate : function(element, values, entryNode){

            var _elementRegistry = elementRegistry;

            return {};
        }
    }));


};