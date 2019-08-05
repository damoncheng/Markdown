var is = require('bpmn-js/lib/util/ModelUtil').is;
var showPropertiesPanel = require('../Utils').showPropertiesPanel;
var subProcessProps = require('../parts/subProcessProps');


function createSubProcessGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler, qflow_arith, qflow_render) {

    if (showPropertiesPanel(element) && is(element, 'bpmn:SubProcess')) {
  
      var generalGroup = {
          id: 'general',
          label: '子流程字段',
          entries: []
      };
  
      subProcessProps(generalGroup, element, bpmnFactory, translate, elementRegistry, qflow_modeler, qflow_arith, qflow_render);
  
      return [
          generalGroup
      ];
  
    }
  
    return [];
  
  }

  module.exports = createSubProcessGroups;