var is = require('bpmn-js/lib/util/ModelUtil').is;

function showPropertiesPanel(element) {

    if (is(element, 'bpmn:FlowNode') &&
        !is(element, 'bpmn:StartEvent') && 
        !is(element, 'bpmn:EndEvent')
    ){
        return true;
    }

    return false;

}

module.exports.showPropertiesPanel = showPropertiesPanel;