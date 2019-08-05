var is = require('bpmn-js/lib/util/ModelUtil').is;
var showPropertiesPanel = require('../Utils').showPropertiesPanel;
var parallelGatewayProps = require('../parts/parallelGatewayProps');

function createParallelGatewayGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler, qflow_arith) {

    console.log("showPropertiesPanel(element) : ", showPropertiesPanel(element), is(element, 'bpmn:ParallelGateway'), element)

    if (showPropertiesPanel(element) && is(element, 'bpmn:ParallelGateway')) {
  
      var generalGroup = {
          id: 'general',
          label: '分支字段',
          entries: []
      };
  
      parallelGatewayProps(generalGroup, element, bpmnFactory, translate, elementRegistry, qflow_modeler, qflow_arith);

      return [
          generalGroup
      ];
  
    }
  
    return [];
  
  }

  module.exports = createParallelGatewayGroups;