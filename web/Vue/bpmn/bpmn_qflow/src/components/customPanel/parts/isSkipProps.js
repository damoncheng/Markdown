'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');

module.exports = function(group, element, translate, elementRegistry) {

    group.entries.push(entryFactory.selectBox({

        id : 'is_skip',
        description : '',
        label : '提交方式',
        modelProperty : 'is_skip',
        selectOptions : [
            { name : '不直接提交' , value : 'N'} , 
            { name : '直接提交' , value : 'Y' },
            { name : '工作日直接提交' , value : "W" },
            { name : '任务责任人直接提交' , value : "S"},
        ],
        validate : function (element, values) {

            var _elementRegistry = elementRegistry;

            return {};
        }
    }));

};