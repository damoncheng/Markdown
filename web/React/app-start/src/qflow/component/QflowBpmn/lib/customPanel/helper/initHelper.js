'use strict';

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements;

var initHelper = {};

module.exports = initHelper;

/**
 * Return form data from business object or undefined if none exist
 *
 * @param  {djs.model.Base} element
 *
 * @return {ModdleElement|undefined} formData
 */
initHelper.getInitTool = function(element) {
  var bo = getBusinessObject(element);

  var initTool = getExtensionElements(bo, 'qflow:InitTool');

  if (typeof initTool !== 'undefined') {
    return initTool[0];
  }
};


/**
 * Return all form fields existing in the business object, and
 * an empty array if none exist.
 *
 * @param  {djs.model.Base} element
 *
 * @return {Array} a list of form field objects
 */
initHelper.getInitToolFields = function(element) {
  var initTool = this.getInitTool(element);

  if (typeof initTool === 'undefined') {
    return [];
  }

  return initTool.tools || [];
};


/**
 * Get a form field from the business object at given index
 *
 * @param {djs.model.Base} element
 * @param {number} idx
 *
 * @return {ModdleElement} the form field
 */
initHelper.getInitToolField = function(element, idx) {

  var initToolFields = this.getInitToolFields(element);

  return initToolFields[idx];
};
