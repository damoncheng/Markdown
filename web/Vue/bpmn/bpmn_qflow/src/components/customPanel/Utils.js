var is = require('bpmn-js/lib/util/ModelUtil').is;

export function showPropertiesPanel(element) {

    if (is(element, 'bpmn:FlowNode') &&
        !is(element, 'bpmn:StartEvent') && 
        !is(element, 'bpmn:EndEvent')
    ){
        return true;
    }

    return false;

}