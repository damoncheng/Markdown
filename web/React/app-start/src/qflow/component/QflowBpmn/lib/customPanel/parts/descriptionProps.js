'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

module.exports = function(group, element, translate, elementRegistry) {

    group.entries.push(entryFactory.textBox({
        id : 'description',
        description : '',
        label : '步骤描述',
        modelProperty : 'description',
        validate : function(element, values, entryNode){

            var _elementRegistry = elementRegistry;

            //console.log("textArea values : ", values);
            //console.log("entryNode : ", entryNode);

            return {};
        }
    }));


};