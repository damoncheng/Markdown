'use strict';

var domQuery = require('min-dom').query,
    domAttr = require('min-dom').attr,
    domClosest = require('min-dom').closest,
    domify = require('min-dom').domify,
    forEach = require('lodash/forEach');

var setDefaultParameters = require('../../Utils').setDefaultParameters;

var addEmptyParameter = function(list) {
    return [{ name: '', value: '' } ].concat(list);
};
  

var isList = function(list) {
    return !(!list || Object.prototype.toString.call(list) !== '[object Array]');
};

function getSelectBox(node) {
    var query = 'select';
    return domQuery(query, node);
}

var selectbox = function(element, bpmnFactory, options, translate) {

  var resource = setDefaultParameters(options),
      label = options.label || resource.id,
      selectOptions = options.selectOptions,
      modelProperty = options.modelProperty,
      description = options.description,
      emptyParameter = options.emptyParameter || false;

  var canBeHidden = !!options.hidden && typeof options.hidden === 'function';
  var canSelected = !!options.selected && typeof options.selected === 'function';

  if(emptyParameter){
      selectOptions = addEmptyParameter(selectOptions);
  }

  resource.html =
    '<label for="qflow-' + resource.id + '"' +
        (canBeHidden ? 'data-show="isHidden" ' : '') +
    '>' + label + '</label>' +
    '<select id="qflow-' + resource.id + '-select" name="' + modelProperty + '"' +
        ' data-value ' +  
        (canBeHidden ? 'data-show="isHidden" ' : '') +
    ' >';

  if (isList(selectOptions)) {
    forEach(selectOptions, function(option) {

      if(canSelected && options.selected(option.value)){

        resource.html += '<option value="' + option.value + '" selected>' + (option.name || '') + '</option>';

      }
      else{

        resource.html += '<option value="' + option.value + '">' + (option.name || '') + '</option>';
    
      }

    });
  }

  resource.html += '</select>';

  resource.get = function(element, node) {

    var select = getSelectBox(node);
    var select_value = select.value;

    //console.log("get node : ", select_value);

    return {modelProperty : select_value};

  };


  resource.set = options.set;

  if (typeof options.get === 'function') {
    resource.get = options.get;
  }

  if (canBeHidden) {
    resource.isHidden = function() {
      return !options.hidden.apply(resource, arguments);
    };
  }

  resource.cssClasses = ['bpp-dropdown'];


  return resource;
};

module.exports = selectbox;