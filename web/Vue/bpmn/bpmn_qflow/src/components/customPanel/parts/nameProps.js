'use strict';

var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    is = require('bpmn-js/lib/util/ModelUtil').is,
    utils = require('bpmn-js-properties-panel/lib/Utils');

module.exports = function(group, element, translate) {

    if (!is(element, 'bpmn:Collaboration')) {

        var modelProperty = 'name';

        if (is(element, 'bpmn:TextAnnotation')) {
          modelProperty = 'text';
        }

        var nameEntry = entryFactory.textBox({
            id: 'name',
            label: '步骤名',
            modelProperty: modelProperty,
            validate : function(element, values, entryNode){

                if(!values.name || values.name.trim() === '') {
                    return {name : '步骤名不能为空'}
                }
    
                return {};
            }
        });
            
        // name
        group.entries = group.entries.concat(
            [ nameEntry ]
        );
    
    }

};