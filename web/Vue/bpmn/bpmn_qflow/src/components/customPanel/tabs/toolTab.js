var is = require('bpmn-js/lib/util/ModelUtil').is;
var showPropertiesPanel = require('../Utils').showPropertiesPanel;
var nameProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps');


// Create the custom magic tab
function createToolTabGroups(element, bpmnFactory, elementRegistry, translate) {

    if (showPropertiesPanel(element) && is(element, 'bpmn:ServiceTask')) {
  
      var toolAvailableVarnameGroup = {
          id: 'tool_available_varname',
          label: '步骤工具可用变量名',
          entries: []
      };

      var toolBindGroup = {
        id: 'tool_bind',
        label: '绑定工具',
        entries: []
      };
  
      nameProps(toolAvailableVarnameGroup, element, translate);
  
      return [
        toolAvailableVarnameGroup,
        toolBindGroup
      ];
  
    }
  
    return [];
  
}

module.exports = createToolTabGroups;