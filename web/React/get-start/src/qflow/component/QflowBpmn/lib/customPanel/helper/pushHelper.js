'use strict';

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements;

var pushHelper = {};

module.exports = pushHelper;


pushHelper.getPushTask = function(element) {
  var bo = getBusinessObject(element);

  var pushTask = getExtensionElements(bo, 'qflow:SendTask');

  if (typeof pushTask !== 'undefined') {
    return pushTask[0];
  }

};


pushHelper.getPushTemplates = function(element) {
  var pushTask = this.getPushTask(element);

  if (typeof pushTask === 'undefined') {
    return [];
  }

  return pushTask.templates || [];
};


pushHelper.getPushTemplate= function(element, idx) {

  var pushTemplates = this.getPushTemplates(element);

  return pushTemplates[idx];
};
