'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

module.exports = function(group,  element, translate, elementRegistry) {

    group.entries.push(entryFactory.textBox({
        id : 'link',
        description : '',
        label : '步骤链接',
        modelProperty : 'link',
        validate : function(element, values, entryNode){

            var _elementRegistry = elementRegistry;

            return {};
        }
    }));


};