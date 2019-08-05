var is = require('bpmn-js/lib/util/ModelUtil').is;
var showPropertiesPanel = require('../Utils').showPropertiesPanel;
var manualProps = require('../parts/manualProps');


function createManualTaskGroups(element, bpmnFactory, elementRegistry, translate) {

    if (showPropertiesPanel(element) && is(element, 'bpmn:ManualTask')) {
  
      var generalGroup = {
          id: 'general',
          label: '审批字段',
          entries: []
      };
  
      manualProps(generalGroup, element, bpmnFactory, translate, elementRegistry);
  
      return [
          generalGroup
      ];
  
    }
  
    return [];
  
  }

  module.exports = createManualTaskGroups;