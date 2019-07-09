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

var initHelper = require('../helper/initHelper');
var forEach = require('lodash/forEach');

var InitToolType = require('./implementation/ToolType'),
    InitTool = require('./implementation/Tool');

function generateValueId() {
  return utils.nextId('Name_');
}

function ensureFormKeyAndDataSupported(element) {
  return (is(element, 'bpmn:StartEvent'))
}

module.exports = function(group, element, bpmnFactory, translate, elementRegistry, qflow_modeler, qflow_arith) {

  if (!ensureFormKeyAndDataSupported(element)) {
    return;
  }

  var qflow_init_tool_type_id = "init_tool_type";
  var qflow_option_init_tool_id = "option_init_tool_id";
  var qflow_value_init_tool_id = "value_init_tool_id";
  var qflow_option_init_tool_type = "option";
  var qflow_value_init_tool_type = "value";

  var option_tools = []; //option
  var value_tools = [];  //option

  for(let one_tool_id in qflow_modeler.qflow_basic.init_value_tools){

    let one_tool = qflow_modeler.qflow_basic.init_value_tools[one_tool_id]

    value_tools.push({name : one_tool.name, value : one_tool_id});

  }

  for(let one_tool_id in qflow_modeler.qflow_basic.init_option_tools){

    let one_tool = qflow_modeler.qflow_basic.init_option_tools[one_tool_id]

    option_tools.push({name : one_tool.name, value : one_tool_id});
    
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

    return initHelper.getInitToolField(element, selected.idx);
  }

  var check_tool_exist = function(element, node){

    var initField = getSelectedFormField(element, node);

    if (initField) {

      let tools = {};
      let tool_id = initField.init_tool_id; 

      if(initField.init_tool_type == qflow_value_init_tool_type){

        tools = qflow_modeler.qflow_basic.init_value_tools;

      }
      else if(initField.init_tool_type == qflow_option_init_tool_type){

        tools = qflow_modeler.qflow_basic.init_option_tools;

      }

      let tool_result = tool_id && (tool_id in tools)

      return tool_result;

    }

    return false;

  }

  //呈现表单所有字段
  var formFieldsEntry = extensionElements(element, bpmnFactory, {
    id: 'init-fields',
    label: translate('工具列表'),
    modelProperty: 'init_tool_id',
    prefix: 'InitToolField',
    createExtensionElement: function(element, extensionElements, value) {
      var bo = getBusinessObject(element), commands = [];

      if (!extensionElements) {
        extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
        commands.push(cmdHelper.updateProperties(element, { extensionElements: extensionElements }));
      }

      var initTool = initHelper.getInitTool(element);

      if (!initTool) {
        initTool = elementHelper.createElement('qflow:InitTool', { tools: [] }, extensionElements, bpmnFactory);
        commands.push(cmdHelper.addAndRemoveElementsFromList(
          element,
          extensionElements,
          'values',
          'extensionElements',
          [initTool],
          []
        ));
      }

      var tool = elementHelper.createElement('qflow:InitToolField', { id: value }, initTool, bpmnFactory);
      if (typeof initTool.tools !== 'undefined') {
        commands.push(cmdHelper.addElementsTolist(element, initTool, 'tools', [ tool ]));
      } else {
        commands.push(cmdHelper.updateBusinessObject(element, initTool, {
          tools: [ tool ]
        }));
      }
      return commands;
    },
    removeExtensionElement: function(element, extensionElements, value, idx) {
      
      if(qflow_modeler.debug)
        console.log("removeExtensionElement.....");
      
      var initTool = getExtensionElements(getBusinessObject(element), 'qflow:InitTool')[0],
          entry = initTool.tools[idx],
          commands = [];

      if (initTool.tools.length < 2) {
        commands.push(removeEntry(getBusinessObject(element), element, initTool));
      } else {
        commands.push(cmdHelper.removeElementsFromList(element, initTool, 'tools', null, [entry]));

        if (entry.id === initTool.get('businessKey')) {
          commands.push(cmdHelper.updateBusinessObject(element, initTool, { 'businessKey': undefined }));
        }
      }

      return commands;
    },
    upExtensionElement: function(element, extensionElements, value, idx){

      var initTool = getExtensionElements(getBusinessObject(element), 'qflow:InitTool')[0],
          pre_entry = initTool.tools[idx - 1],
          entry = initTool.tools[idx],
          commands = [];

      var listCopy = [];
      forEach(initTool.tools, function(object, index) {
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

      commands.push(cmdHelper.setList(element, initTool, "tools", listCopy));

      return commands;
    },
    getExtensionElements: function(element) {
      return initHelper.getInitToolFields(element);
    },
    hideExtensionElements: function(element, node) {
      return false;
    },
    translate : function(element){

      var tool_type = element.get("init_tool_type");
      var tool_id = element.get("init_tool_id");
      var tool_prefix = "";
      var tools = {};

      if(tool_type == qflow_value_init_tool_type){

        tools = qflow_modeler.qflow_basic.init_value_tools;
        tool_prefix = "value::"

      }
      else if(tool_type == qflow_option_init_tool_type){

        tools = qflow_modeler.qflow_basic.init_option_tools;
        tool_prefix = "option::"

      }


      if(tool_id && tool_id in tools)
        return tool_prefix + tools[tool_id].name;

      return "--"


    }

  });
  group.entries.push(formFieldsEntry);

  group.entries.push(entryFactory.label({
    id: 'tool-field-header',
    labelText: translate('工具配置'),
    showLabel: function(element, node) {
        return !!getSelectedFormField(element, node);
    }
  }));

  group.entries.push(entryFactory.validationAwareTextField({
    id: 'tool-field-id',
    label: translate('ID'),
    modelProperty: 'id',

    getProperty: function(element, node) {
      var selectedFormField = getSelectedFormField(element, node) || {};

      return selectedFormField.id;
    },

    setProperty: function(element, properties, node) {
      var initField = getSelectedFormField(element, node);

      return cmdHelper.updateBusinessObject(element, initField, properties);
    },

    hidden: function(element, node) {
      return !getSelectedFormField(element, node);
    },

    validate: function(element, values, node) {

      var initField = getSelectedFormField(element, node);

      if (initField) {

        var idValue = values.id;

        if (!idValue || idValue.trim() === '') {
          return { id: '字段id必须不为空' };
        }

        var initFields = initHelper.getInitToolFields(element);

        var existingFormField = find(initFields, function(f) {
          return f !== initField && f.id === idValue;
        });

        if (existingFormField) {
          return { id: '字段id已经存在' };
        }
      }
    }
    
  }));

  //工具类型 : 任务初始化工具，选项初始化工具
  group.entries.push(InitToolType(element, bpmnFactory, {
    id : qflow_init_tool_type_id,
    description : '',
    label : '工具类型',
    modelProperty : qflow_init_tool_type_id,
    selectOptions : [
        {name : "字段值初始化工具", value : qflow_value_init_tool_type},
        {name : "字段选项初始化工具", value : qflow_option_init_tool_type}
    ],

    get : function(element, node){

      var selectedFormField = getSelectedFormField(element, node) || {};

      if (selectedFormField) {
        return { init_tool_type : selectedFormField.init_tool_type };
      } else {
        return {};
      }

    },

    set : function(element, values, node){

      var selectedFormField = getSelectedFormField(element, node),
          commands = [];

      commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, values));
      //切换工具类型(init_tool_type)时，必须清空工具id(init_tool_id)
      commands.push(cmdHelper.updateBusinessObject(element, selectedFormField, {init_tool_id : ""}));

      return commands;

    },

    hidden: function(element, node) {
      return !getSelectedFormField(element, node);
    }

  }, translate));

  group.entries.push(InitTool(element, bpmnFactory, {

    id : qflow_value_init_tool_id,
    description : '',
    label : '字段值初始化工具',
    modelProperty : qflow_value_init_tool_id,
    selectOptions : value_tools,
    emptyParameter : true,
    hidden : function(element, node){

       var selectedFormField = getSelectedFormField(element, node);

       if (selectedFormField) {
         return !(selectedFormField.init_tool_type == qflow_value_init_tool_type);
       }
        
       return true

    },
    get : function(element, node){

      var selectedFormField = getSelectedFormField(element, node) || {};

      if (selectedFormField) {
        return { value_init_tool_id : selectedFormField.init_tool_id };
      } else {
        return {};
      }

    },
    set : function(element, values, node) {

        //console.log("values : ", values);
        var selectedFormField = getSelectedFormField(element, node);
    
        var tool_id = values[qflow_value_init_tool_id];
    
        values = {init_tool_id : tool_id};
    
        
        return cmdHelper.updateBusinessObject(element, selectedFormField, values);

    
      }
    
}, translate));

group.entries.push(InitTool(element, bpmnFactory,{

    id : qflow_option_init_tool_id,
    description : '',
    label : '字段选项初始化工具',
    modelProperty : qflow_option_init_tool_id,
    selectOptions : option_tools,
    emptyParameter : true,
    hidden : function(element, node){

      var selectedFormField = getSelectedFormField(element, node);

      if (selectedFormField) {
        return !(selectedFormField.init_tool_type == qflow_option_init_tool_type);
      }

      return true;

    },
    get : function(element, node){

      var selectedFormField = getSelectedFormField(element, node) || {};

      if (selectedFormField) {
        return { option_init_tool_id : selectedFormField.init_tool_id };
      } else {
        return {};
      }

    },
    set : function(element, values, node) {

      var selectedFormField = getSelectedFormField(element, node);

      var tool_id = values[qflow_option_init_tool_id];
    
      values = {init_tool_id : tool_id};
      
      return cmdHelper.updateBusinessObject(element, selectedFormField, values);

    }
    
  }, translate));


  group.entries.push(entryFactory.label({

    id : "qflow_init_tool_params_label",
    labelText : '工具参数',
    description : '',
    modelProperty : "qflow_init_tool_params_label",
    showLabel : check_tool_exist
    
  }));

  group.entries.push(renderLabel({

      id : "qflow_init_tool_params",
      description : '',
      modelProperty : "qflow_init_tool_params",
      render : function(element, node){

        var params_text = "";
        var initField = getSelectedFormField(element, node);

        if (initField) {
    
          let tools = {};
          let tool_id = initField.init_tool_id; 
    
          if(initField.init_tool_type == qflow_value_init_tool_type){
    
            tools = qflow_modeler.qflow_basic.init_value_tools;
    
          }
          else if(initField.init_tool_type == qflow_option_init_tool_type){
    
            tools = qflow_modeler.qflow_basic.init_option_tools;
    
          }

          if(tool_id && (tool_id in tools)){

            var params_list = [];

            for(let one_param of tools[tool_id]["params"]){

                //params_text += '<li>' + one_param.name + '</li>'
                params_list.push(one_param.name);

            }

            var params_dict = qflow_arith.get_rendered_element_params(element, params_list, "shape", 
                {"is_task_owner" : "2"}, {"is_on_apply_fill" : true});

            for(let one_param in params_dict){
                params_text += params_dict[one_param]
            }

          }

        }

        return params_text;
      },
      showLabel : check_tool_exist
      
  }));


}