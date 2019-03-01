'use strict';

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject,
    getExtensionElements = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').getExtensionElements,
    removeEntry = require('bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper').removeEntry,
    extensionElements = require('bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/ExtensionElements'),
    properties = require('bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/Properties'),
    entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory'),
    elementHelper = require('bpmn-js-properties-panel/lib/helper/ElementHelper'),
    cmdHelper = require('bpmn-js-properties-panel/lib/helper/CmdHelper'),
    utils = require('bpmn-js-properties-panel/lib/Utils'),
    is = require('bpmn-js/lib/util/ModelUtil').is,
    find = require('lodash/find'),
    each = require('lodash/forEach');

var formHelper = require('../helper/formHelper');
var enumValidate = require('../validate/enumValidate');

function generateValueId() {
  return utils.nextId('Name_');
}

/**
 * Generate a form field specific textField using entryFactory.
 *
 * @param  {string} options.id
 * @param  {string} options.label
 * @param  {string} options.modelProperty
 * @param  {function} options.validate
 *
 * @return {Object} an entryFactory.textField object
 */
function formFieldTextField(options, getSelectedFormField) {

  var id = options.id,
      label = options.label,
      modelProperty = options.modelProperty,
      validate = options.validate;

  return entryFactory.textField({
    id: id,
    label: label,
    modelProperty: modelProperty,
    get: function(element, node) {
      var selectedFormField = getSelectedFormField(element, node) || {},
          values = {};

      values[modelProperty] = selectedFormField[modelProperty];

      return values;
    },

    set: function(element, values, node) {
      var commands = [];

      if (typeof options.set === 'function') {
        var cmd = options.set(element, values, node);

        if (cmd) {
          commands.push(cmd);
        }
      }

      var formField = getSelectedFormField(element, node),
          properties = {};

      properties[modelProperty] = values[modelProperty] || undefined;

      commands.push(cmdHelper.updateBusinessObject(element, formField, properties));

      return commands;
    },
    hidden: function(element, node) {
      return !getSelectedFormField(element, node);
    },
    validate: validate
  });
}

function ensureFormKeyAndDataSupported(element) {
  return (
    !is(element, 'bpmn:StartEvent') && !is(element.parent, 'bpmn:EndEvent')
  ) && is(element, 'bpmn:FlowNode');
}

module.exports = function(group, element, bpmnFactory, translate) {

  if (!ensureFormKeyAndDataSupported(element)) {
    return;
  }


  /**
   * Return the currently selected form field querying the form field select box
   * from the DOM.
   *
   * @param  {djs.model.Base} element
   * @param  {DOMElement} node - DOM element of any form field text input
   *
   * @return {ModdleElement} the currently selected form field
   */
  function getSelectedFormField(element, node) {
    var selected = formFieldsEntry.getSelected(element, node.parentNode);

    if (selected.idx === -1) {
      return;
    }

    return formHelper.getFormField(element, selected.idx);
  }

  //更新表单ID
  group.entries.push(entryFactory.textField({
    id : 'form-key',
    label : translate('表单ID'),
    description : '',
    modelProperty: 'formKey',
    get: function(element, node) {
      var bo = getBusinessObject(element);

      return {
        formKey: bo.get('qflow:formKey')
      };
    },
    set: function(element, values, node) {
      var bo = getBusinessObject(element),
          formKey = values.formKey || undefined;

      return cmdHelper.updateBusinessObject(element, bo, { 'qflow:formKey': formKey });
    }
  }));

  //呈现表单所有字段
  var formFieldsEntry = extensionElements(element, bpmnFactory, {
    id: 'form-fields',
    label: translate('表单字段'),
    modelProperty: 'id',
    prefix: 'FormField',
    createExtensionElement: function(element, extensionElements, value) {
      var bo = getBusinessObject(element), commands = [];

      if (!extensionElements) {
        extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
        commands.push(cmdHelper.updateProperties(element, { extensionElements: extensionElements }));
      }

      var formData = formHelper.getFormData(element);

      if (!formData) {
        formData = elementHelper.createElement('qflow:FormData', { fields: [] }, extensionElements, bpmnFactory);
        commands.push(cmdHelper.addAndRemoveElementsFromList(
          element,
          extensionElements,
          'values',
          'extensionElements',
          [formData],
          []
        ));
      }

      var field = elementHelper.createElement('qflow:FormField', { id: value }, formData, bpmnFactory);
      if (typeof formData.fields !== 'undefined') {
        commands.push(cmdHelper.addElementsTolist(element, formData, 'fields', [ field ]));
      } else {
        commands.push(cmdHelper.updateBusinessObject(element, formData, {
          fields: [ field ]
        }));
      }
      return commands;
    },
    removeExtensionElement: function(element, extensionElements, value, idx) {
      var formData = getExtensionElements(getBusinessObject(element), 'qflow:FormData')[0],
          entry = formData.fields[idx],
          commands = [];

      if (formData.fields.length < 2) {
        commands.push(removeEntry(getBusinessObject(element), element, formData));
      } else {
        commands.push(cmdHelper.removeElementsFromList(element, formData, 'fields', null, [entry]));

        if (entry.id === formData.get('businessKey')) {
          commands.push(cmdHelper.updateBusinessObject(element, formData, { 'businessKey': undefined }));
        }
      }

      return commands;
    },
    getExtensionElements: function(element) {
      return formHelper.getFormFields(element);
    },
    hideExtensionElements: function(element, node) {
      return false;
    }
  });
  group.entries.push(formFieldsEntry);

  //选择表单具体字段时，呈现`字段详情`label
  group.entries.push(entryFactory.label({
    id: 'form-field-header',
    labelText: translate('字段基本属性'),
    showLabel: function(element, node) {
        return !!getSelectedFormField(element, node);
    }
  }));

  //表单字段ID = 表单name, 且做为空检测
  group.entries.push(entryFactory.validationAwareTextField({
    
    id: 'form-field-id',
    label: translate('字段名'),
    modelProperty: 'id',

    getProperty: function(element, node) {
      var selectedFormField = getSelectedFormField(element, node) || {};

      return selectedFormField.id;
    },

    setProperty: function(element, properties, node) {
      var formField = getSelectedFormField(element, node);

      return cmdHelper.updateBusinessObject(element, formField, properties);
    },

    hidden: function(element, node) {
      return !getSelectedFormField(element, node);
    },

    validate: function(element, values, node) {

      var formField = getSelectedFormField(element, node);

      if (formField) {

        var idValue = values.id;

        if (!idValue || idValue.trim() === '') {
          return { id: '字段名不能为空' };
        }

        /*
        var formFields = formHelper.getFormFields(element);

        var existingFormField = find(formFields, function(f) {
          return f !== formField && f.id === idValue;
        });

        if (existingFormField) {
          return { id: '表单字段ID已经被占用.' };
        }
        */
      }
    }
  }));

  group.entries.push(entryFactory.textBox({
    id : 'form-field-link',
    description : '',
    label : '字段链接',
    modelProperty : 'link',

    getProperty: function(element, node) {
        var selectedFormField = getSelectedFormField(element, node) || {};
  
        return selectedFormField.link;
    },
  
    setProperty: function(element, properties, node) {
        var formField = getSelectedFormField(element, node);

        return cmdHelper.updateBusinessObject(element, formField, properties);
    },

    show: function(element, node) {
        return !!getSelectedFormField(element, node);
    }

  }));

  group.entries.push(entryFactory.textBox({
    id : 'form-field-description',
    description : '',
    label : '字段描述',
    modelProperty : 'description',

    getProperty: function(element, node) {
        var selectedFormField = getSelectedFormField(element, node) || {};
  
        return selectedFormField.description;
    },
  
    setProperty: function(element, properties, node) {
        var formField = getSelectedFormField(element, node);

        return cmdHelper.updateBusinessObject(element, formField, properties);
    },

    show: function(element, node) {
        return !!getSelectedFormField(element, node);
    }

  }));

  // [FormData] form field type combo box
  group.entries.push(entryFactory.selectBox({
    id: 'form-field-type',
    label: translate('字段类型'),
    selectOptions: [
      { name: '单行文本', value: 'input' },
      { name: '多行文本', value: 'textarea' },
      { name: '仅确认无需确认', value: 'info' },
      { name: '下拉框', value: 'select' },
      { name: '复选框', value: 'checkbox' },
      { name: '单选框', value: 'radio' },
      { name: '日期', value: 'date' },
      { name: '时间', value: 'time' },
      { name: '文件', value: 'file' },
      { name: 'rtx用户', value: 'rtx' }
    ],
    modelProperty: 'field_type',
    //emptyParameter: true,

    get: function(element, node) {
      var selectedFormField = getSelectedFormField(element, node);

      if (selectedFormField) {
        return { field_type: selectedFormField.field_type };
      } else {
        return {};
      }
    },
    set: function(element, values, node) {
      var selectedFormField = getSelectedFormField(element, node),
          formData = getExtensionElements(getBusinessObject(element), 'qflow:FormData')[0],
          commands = [];

      if (selectedFormField.field_type === 'enum' && values.field_type !== 'enum') {
          // delete camunda:value objects from formField.values when switching from type enum
          commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, { values: undefined }));
      }

      commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, values));

      return commands;
    },
    hidden: function(element, node) {
      return !getSelectedFormField(element, node);
    }

  }));

  group.entries.push(formFieldTextField({
    id: 'form-field-defaultValue',
    label: translate('默认值'),
    modelProperty: 'default_value'
  }, getSelectedFormField));

  // [FormData] form field enum values label
  group.entries.push(entryFactory.label({
    id: 'form-field-enum-values-header',
    labelText: translate('字段选项'),
    divider: true,
    showLabel: function(element, node) {
      var selectedFormField = getSelectedFormField(element, node);

      return selectedFormField && (["select", "checkbox", "radio"].includes(selectedFormField.field_type));
    }
  }));

  // [FormData] form field enum values table
  group.entries.push(entryFactory.table({   
    id: 'form-field-enum-values',
    labels: [ translate('选项名'), translate('选项值') ],
    modelProperties: [ 'name', 'value' ],
    show: function(element, node) {
      var selectedFormField = getSelectedFormField(element, node);

      return selectedFormField && (["select", "checkbox", "radio"].includes(selectedFormField.field_type));
    },
    getElements: function(element, node) {
      var selectedFormField = getSelectedFormField(element, node);

      return formHelper.getEnumValues(selectedFormField);
    },
    addElement: function(element, node) {
      var selectedFormField = getSelectedFormField(element, node),
          name = generateValueId();

      var enumValue = elementHelper.createElement(
        'qflow:Value',
        { name: name, value: undefined },
        getBusinessObject(element),
        bpmnFactory
      );

      return cmdHelper.addElementsTolist(element, selectedFormField, 'values', [enumValue]);
    },
    removeElement: function(element, node, idx) {
      var selectedFormField = getSelectedFormField(element, node),
          enumValue = selectedFormField.values[idx];

      return cmdHelper.removeElementsFromList(element, selectedFormField, 'values', null, [enumValue]);
    },
    updateElement: function(element, value, node, idx) {
      var selectedFormField = getSelectedFormField(element, node),
          enumValue = selectedFormField.values[idx];

      value.value = value.value || undefined;
      return cmdHelper.updateBusinessObject(element, enumValue, value);
    },
    validate: function(element, value, node, idx) {

      var selectedFormField = getSelectedFormField(element, node),
          enumValue = selectedFormField.values[idx];

      if (enumValue) {

        var validationError = enumValidate.uniqueValid(selectedFormField.values,
            "name", idx, value.name);

        if (validationError) {
          return { name: validationError };
        }
      }

    }
  }));

  group.entries.push(entryFactory.label({
    id: 'form-field-assist-values-header',
    labelText: translate('字段辅助选项'),
    divider: true,
    showLabel: function(element, node) {
        return !!getSelectedFormField(element, node);
    }
  }));

  group.entries.push(entryFactory.checkbox({
    id : 'form-field-is-required',
    description : '',
    label : '必填',
    modelProperty : 'is_required',
    get: function(element, node) {
        var selectedFormField = getSelectedFormField(element, node);
  
        if (selectedFormField) {
          return { is_required : selectedFormField.is_required };
        } else {
          return {};
        }
    },
    set: function(element, values, node) {
        var selectedFormField = getSelectedFormField(element, node),
            formData = getExtensionElements(getBusinessObject(element), 'qflow:FormData')[0],
            commands = [];

        var res = {};
        res['is_required'] = !!values['is_required'];
  
        commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, res));
  
        return commands;
      },
    hidden: function(element, node) {
        return !getSelectedFormField(element, node);
    }
}));

group.entries.push(entryFactory.checkbox({
    id : 'form-field-is-on-task-top',
    description : '',
    label : '置顶',
    modelProperty : 'is_on_task_top',
    get: function(element, node) {
        var selectedFormField = getSelectedFormField(element, node);
  
        if (selectedFormField) {
          return { is_on_task_top : selectedFormField.is_on_task_top };
        } else {
          return {};
        }
      },
    set: function(element, values, node) {

        var selectedFormField = getSelectedFormField(element, node),
            formData = getExtensionElements(getBusinessObject(element), 'qflow:FormData')[0],
            commands = [];

        var res = {};

        res['is_on_task_top'] = !!values['is_on_task_top'];
  
        commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, res));
  
        return commands;
    },
    hidden: function(element, node) {
        return !getSelectedFormField(element, node);
    }
  }));

  group.entries.push(entryFactory.checkbox({
    id : 'form-field-is-on-apply-fill',
    description : '',
    label : '回写',
    modelProperty : 'is_on_apply_fill',
    get: function(element, node) {
        var selectedFormField = getSelectedFormField(element, node);
  
        if (selectedFormField) {
          return { is_on_apply_fill : selectedFormField.is_on_apply_fill };
        } else {
          return {};
        }
      },
    set: function(element, values, node) {

        var selectedFormField = getSelectedFormField(element, node),
            formData = getExtensionElements(getBusinessObject(element), 'qflow:FormData')[0],
            commands = [];

        var res = {};

        res['is_on_apply_fill'] = !!values['is_on_apply_fill'];
  
        commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, res));
  
        return commands;
    },
    hidden: function(element, node) {
        return !getSelectedFormField(element, node);
    }
  }));

  group.entries.push(entryFactory.checkbox({
    id : 'form-field-is-pushed',
    description : '',
    label : '推送',
    modelProperty : 'is_pushed',
    get: function(element, node) {
        var selectedFormField = getSelectedFormField(element, node);
  
        if (selectedFormField) {
          return { is_pushed : selectedFormField.is_pushed };
        } else {
          return {};
        }
      },
    set: function(element, values, node) {

        var selectedFormField = getSelectedFormField(element, node),
            formData = getExtensionElements(getBusinessObject(element), 'qflow:FormData')[0],
            commands = [];

        var res = {};

        res['is_pushed'] = !!values['is_pushed'];
  
        commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, res));
  
        return commands;
    },
    hidden: function(element, node) {
        return !getSelectedFormField(element, node);
    }
  }));

  group.entries.push(entryFactory.checkbox({
    id : 'form-field-is-inherited',
    description : '',
    label : '继承',
    modelProperty : 'is_inherited',
    get: function(element, node) {
        var selectedFormField = getSelectedFormField(element, node);
  
        if (selectedFormField) {
          return { is_inherited : selectedFormField.is_inherited };
        } else {
          return {};
        }
      },
    set: function(element, values, node) {

        var selectedFormField = getSelectedFormField(element, node),
            formData = getExtensionElements(getBusinessObject(element), 'qflow:FormData')[0],
            commands = [];

        var res = {};

        res['is_inherited'] = !!values['is_inherited'];
  
        commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, res));
  
        return commands;
    },
    hidden: function(element, node) {
        return !getSelectedFormField(element, node);
    }
  }));

  group.entries.push(entryFactory.checkbox({
    id : 'form-field-is-task-name',
    description : '',
    label : '任名',
    modelProperty : 'is_task_name',
    get: function(element, node) {
        var selectedFormField = getSelectedFormField(element, node);
  
        if (selectedFormField) {
          return { is_task_name : selectedFormField.is_task_name };
        } else {
          return {};
        }
      },
    set: function(element, values, node) {

        var selectedFormField = getSelectedFormField(element, node),
            formData = getExtensionElements(getBusinessObject(element), 'qflow:FormData')[0],
            commands = [];

        var res = {};

        res['is_task_name'] = !!values['is_task_name'];
  
        commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, res));
  
        return commands;
    },
    hidden: function(element, node) {
        return !getSelectedFormField(element, node);
    }

  }));

  group.entries.push(entryFactory.checkbox({
    id : 'form-field-is-encrypt',
    description : '',
    label : '加密',
    modelProperty : 'is_encrypt',
    get: function(element, node) {
        var selectedFormField = getSelectedFormField(element, node);
  
        if (selectedFormField) {
          return { is_encrypt : selectedFormField.is_encrypt };
        } else {
          return {};
        }
      },
    set: function(element, values, node) {

        var selectedFormField = getSelectedFormField(element, node),
            formData = getExtensionElements(getBusinessObject(element), 'qflow:FormData')[0],
            commands = [];

        var res = {};

        res['is_encrypt'] = !!values['is_encrypt'];
  
        commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, res));
  
        return commands;
    },
    hidden: function(element, node) {
        return !getSelectedFormField(element, node);
    }
    
  }));

}