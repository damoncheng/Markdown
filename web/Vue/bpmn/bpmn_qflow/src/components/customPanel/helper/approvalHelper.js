'use strict';

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements;

var ApprovalHelper = {};

module.exports = ApprovalHelper;

ApprovalHelper.getApprovalSuccessData = function(element) {
    var bo = getBusinessObject(element);
  
    var qflowManual = getExtensionElements(bo, 'qflow:ManualTask');
  
    if (typeof qflowManual !== 'undefined') {

      return qflowManual[0].success;

    } else {
        return "通过"
    }
};

ApprovalHelper.setApprovalSusccessData = function(element, values, node){

    var bo = getBusinessObject(element);

    var extensionElements = bo.get('extensionElements');

    var commands = [];
    if (!extensionElements) {
      extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
      commands.push(cmdHelper.updateBusinessObject(element, bo, { extensionElements: extensionElements }));
    }

    commands.push(createElement(element, extensionElements, action.value, node));
    return commands;

};

    