var showPropertiesPanel = require('../Utils').showPropertiesPanel;
var is = require('bpmn-js/lib/util/ModelUtil').is;
var serviceProps = require('../parts/serviceProps');

function createServiceTaskGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler, qflow_arith) {

    if (showPropertiesPanel(element) && is(element, 'bpmn:ServiceTask')) {
  
      var generalGroup = {
          id: 'general',
          label: '绑定工具',
          entries: []
      };
  
      serviceProps(generalGroup, element, bpmnFactory, translate, elementRegistry, qflow_modeler, qflow_arith);

      return [
          generalGroup
      ];
  
    }
  
    return [];
  
  }

  module.exports = createServiceTaskGroups;