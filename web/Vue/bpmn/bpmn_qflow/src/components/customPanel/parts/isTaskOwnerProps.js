'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

module.exports = function(group, elementRegistry, element, translate, 
    property, label, selectOptions, description = "") {

    group.entries.push(entryFactory.selectBox({

        id : 'is_task_owner',
        description : '',
        label : '步骤责任人',
        modelProperty : 'is_task_owner',
        selectOptions : [
            { name : '默认步骤责任人' , value : '0'} , 
            { name : '流程发起者' , value : '1' },
            { name : '流程发起者配置' , value : '2' },
        ],
        validate : function (element, values) {

            var _elementRegistry = elementRegistry;

            return {};
        }
    }));

};