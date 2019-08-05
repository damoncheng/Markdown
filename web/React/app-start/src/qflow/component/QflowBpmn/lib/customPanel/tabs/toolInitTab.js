var is = require('bpmn-js/lib/util/ModelUtil').is;
var showPropertiesPanel = require('../Utils').showPropertiesPanel;
var initProps = require('../parts/initProps');


function createToolInitGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler, qflow_arith) {

    var generalGroup = {
        id: 'general',
        label: '初始化工具',
        entries: []
    }; 

    initProps(generalGroup, element, bpmnFactory, translate, elementRegistry, qflow_modeler, qflow_arith);

    return [
        generalGroup
    ];

  }

  module.exports = createToolInitGroups;