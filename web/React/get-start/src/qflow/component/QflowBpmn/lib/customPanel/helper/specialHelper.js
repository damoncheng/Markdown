'use strict';

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements;


var SpecialHelper = {};

module.exports = SpecialHelper;

SpecialHelper.getApprovalField = function(element) {
    var bo = getBusinessObject(element);

    if(bo){
  
        var manual = getExtensionElements(bo, 'qflow:manualTask');
    
        if (typeof manual !== 'undefined') {
          return manual[0];
        }

    }
    
};

SpecialHelper.getSubProcessField = function(element) {
    var bo = getBusinessObject(element);

    if(bo){
  
        var subProcess = getExtensionElements(bo, 'qflow:subProcess');
    
        if (typeof subProcess !== 'undefined') {
          return subProcess[0];
        }

    }
    
};

SpecialHelper.getBranchField = function(element) {
    var bo = getBusinessObject(element);

    if(bo){
  
        var branch = getExtensionElements(bo, 'qflow:parallelGateway');
    
        if (typeof branch !== 'undefined') {
          return branch[0];
        }

    }
    
};