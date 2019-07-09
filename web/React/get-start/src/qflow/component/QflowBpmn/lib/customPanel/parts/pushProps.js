'use strict';

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements,
    removeEntry = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').removeEntry,
    extensionElements = require('./implementation/ExtensionElements'),
    properties = require('./implementation/Properties'),
    entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
    utils = require('../Utils'),
    is = require('bpmn-js/lib/util/ModelUtil').is,
    find = require('lodash/find'),
    each = require('lodash/forEach');

var renderLabel = require('./implementation/RenderLabel');

var pushHelper = require('../helper/pushHelper');
var forEach = require('lodash/forEach');


module.exports = function(group, element, bpmnFactory, translate, elementRegistry, qflow_modeler, qflow_arith) {

    var push_template_option = [];

    push_template_option.push({name : "", value : ""});

    for(let one_push_id in qflow_modeler.qflow_basic.push_templates){

        let one_template = qflow_modeler.qflow_basic.push_templates[one_push_id];

        push_template_option.push({name : one_template.name,value: one_push_id});

    }

    function getSelectedFormField(element, node) {
        var selected = formFieldsEntry.getSelected(element, node.parentNode);
    
        if (selected.idx === -1) {
          return;
        }
    
        return pushHelper.getPushTemplate(element, selected.idx);
    }

    function check_template_exists(element, node){

        var pushField = getSelectedFormField(element, node);
        var templateDict = qflow_modeler.qflow_basic.push_templates;

        if(pushField)
        {

            var bo = getBusinessObject(pushField);

            if(bo.template_id && bo.template_id in templateDict)
                return true;

        }

        return false;       

    }

    //呈现表单所有字段
  var formFieldsEntry = extensionElements(element, bpmnFactory, {
    id: 'push-templates',
    label: translate('模版列表'),
    modelProperty: 'template_id',
    prefix: 'PushTemplate',
    createExtensionElement: function(element, extensionElements, value) {
      var bo = getBusinessObject(element), commands = [];

      if (!extensionElements) {
        extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
        commands.push(cmdHelper.updateProperties(element, { extensionElements: extensionElements }));
      }

      var pushTask = pushHelper.getPushTask(element);

      if (!pushTask) {
        pushTask = elementHelper.createElement('qflow:SendTask', { templates: [] }, extensionElements, bpmnFactory);
        commands.push(cmdHelper.addAndRemoveElementsFromList(
          element,
          extensionElements,
          'values',
          'extensionElements',
          [pushTask],
          []
        ));
      }

      var template = elementHelper.createElement('qflow:PushTemplate', { id: value }, pushTask, bpmnFactory);
      if (typeof pushTask.templates !== 'undefined') {
        commands.push(cmdHelper.addElementsTolist(element, pushTask, 'templates', [ template ]));
      } else {
        commands.push(cmdHelper.updateBusinessObject(element, pushTask, {
          templates: [ template ]
        }));
      }
      return commands;
    },
    removeExtensionElement: function(element, extensionElements, value, idx) {
      
      if(qflow_modeler.debug)
        console.log("removeExtensionElement.....");
      
      var pushTask = getExtensionElements(getBusinessObject(element), 'qflow:SendTask')[0],
          entry = pushTask.templates[idx],
          commands = [];

      if (pushTask.templates.length < 2) {
        commands.push(removeEntry(getBusinessObject(element), element, pushTask));
      } else {
        commands.push(cmdHelper.removeElementsFromList(element, pushTask, 'templates', null, [entry]));

        if (entry.id === pushTask.get('businessKey')) {
          commands.push(cmdHelper.updateBusinessObject(element, pushTask, { 'businessKey': undefined }));
        }
      }

      return commands;
    },
    upExtensionElement: function(element, extensionElements, value, idx){

      var pushTask = getExtensionElements(getBusinessObject(element), 'qflow:SendTask')[0],
          pre_entry = pushTask.templates[idx - 1],
          entry = pushTask.templates[idx],
          commands = [];

      var listCopy = [];
      forEach(pushTask.templates, function(object, index) {
          if(index == (idx - 1)){
            listCopy.push(entry);
          }
          else if(index == idx) {
            listCopy.push(pre_entry);
          }
          else{
            listCopy.push(object);
          }
      });

      commands.push(cmdHelper.setList(element, pushTask, "templates", listCopy));

      return commands;
    },
    getExtensionElements: function(element) {
      return pushHelper.getPushTemplates(element);
    },
    hideExtensionElements: function(element, node) {
      return false;
    },
    translate : function(element){

      var template_id = element.get("template_id");
      var templates = qflow_modeler.qflow_basic.push_templates;
    
      if(template_id && template_id in templates)
        return templates[template_id].name;

      return "--"

    }

  });
  group.entries.push(formFieldsEntry);

  group.entries.push(entryFactory.label({
    id: 'push-template-header',
    labelText: translate('模版选择'),
    showLabel: function(element, node) {
        return !!getSelectedFormField(element, node);
    }
  }));

  group.entries.push(entryFactory.validationAwareTextField({
    id: 'push-template-field-id',
    label: translate('ID'),
    modelProperty: 'id',

    getProperty: function(element, node) {
      var selectedFormField = getSelectedFormField(element, node) || {};

      return selectedFormField.id;
    },

    setProperty: function(element, properties, node) {
      var templateField = getSelectedFormField(element, node);

      return cmdHelper.updateBusinessObject(element, templateField, properties);
    },

    hidden: function(element, node) {
      return !getSelectedFormField(element, node);
    },

    validate: function(element, values, node) {

      var templateField = getSelectedFormField(element, node);

      if (templateField) {

        var idValue = values.id;

        if (!idValue || idValue.trim() === '') {
          return { id: '字段id必须不为空' };
        }

        var templateFields = pushHelper.getPushTemplates(element);

        var existingFormField = find(templateFields, function(f) {
          return f !== templateField && f.id === idValue;
        });

        if (existingFormField) {
          return { id: '字段id已经存在' };
        }
      }
    }
    
  }));

  group.entries.push(entryFactory.selectBox({

    id : 'push_template_id',
    description : '',
    label : '模版选项',
    modelProperty : 'template_id',
    selectOptions : push_template_option,
    //emptyParameter : true,
    get: function(element, node) {
        var selectedFormField = getSelectedFormField(element, node);
  
        if (selectedFormField) {
          return { template_id: selectedFormField.template_id };
        } else {
          return {};
        }
      },
    set: function(element, values, node) {
        var selectedFormField = getSelectedFormField(element, node),
            commands = [];

        commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, values));

        return commands;
    },
    hidden: function(element, node) {
        return !getSelectedFormField(element, node);
    }

  }));

  
  group.entries.push(entryFactory.label({

    id : "qflow_push_template_label",
    labelText : '模版解析',
    description : '',
    showLabel : check_template_exists
    
  }));

  group.entries.push(renderLabel({

    id : "qflow_push_template_params",
    description : '',
    modelProperty : "qflow_push_template_params",
    render : function(element, node){

      var params_text = "";
      var pushField = getSelectedFormField(element, node);
      var templateDict = qflow_modeler.qflow_basic.push_templates;


      if (pushField) {
  
        let template_id = pushField.template_id;

        if(template_id && (template_id in templateDict)){

          var params_list = [];
          var template = templateDict[template_id];

          if(template.msg){

             var template_regex = /{{(.*?)}}/g;
             var match;

             while(match = template_regex.exec(template.msg)){

                params_list.push(match[1])

             }

          }

          if(params_list.length > 0){

            var params_dict = qflow_arith.get_rendered_element_params(element, params_list, undefined, undefined, undefined, true);

            for(let one_param in params_dict){
                params_text += params_dict[one_param];
            }

          }

        }

      }

      return params_text;
    },
    showLabel : check_template_exists

  }));

}