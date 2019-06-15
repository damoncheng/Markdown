var is = require('bpmn-js/lib/util/ModelUtil').is;
var showPropertiesPanel = require('../Utils').showPropertiesPanel;
var approvalProps = require('../parts/approvalProps');


// Create the custom magic tab
function createApprovalTabGroups(element, bpmnFactory, elementRegistry, translate) {

    if (showPropertiesPanel(element) && is(element, 'bpmn:ManualTask')) {
  
        var approvalGroup = {
            id: 'success',
            label: '步骤通过内容',
            entries: []
        };
  
        approvalProps(approvalGroup, element, translate, elementRegistry);
    
        return [
            approvalGroup
        ];
    
    }
  
    return [];
  
}

module.exports = createApprovalTabGroups;