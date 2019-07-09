var is = require('bpmn-js/lib/util/ModelUtil').is;
var showPropertiesPanel = require('../Utils').showPropertiesPanel;
var pushProps = require('../parts/pushProps');


function createPushTaskGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler, qflow_arith) {

    if (showPropertiesPanel(element) && is(element, 'bpmn:SendTask')) {
  
      var generalGroup = {
          id: 'general',
          label: '推送模版总览',
          entries: []
      };
  
      pushProps(generalGroup, element, bpmnFactory, translate, elementRegistry, qflow_modeler, qflow_arith);

  
      return [
          generalGroup
      ];
  
    }
  
    return [];
  
  }

  module.exports = createPushTaskGroups;