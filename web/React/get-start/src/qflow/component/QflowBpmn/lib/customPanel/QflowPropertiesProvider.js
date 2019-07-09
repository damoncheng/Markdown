'use strict';

var is = require('bpmn-js/lib/util/ModelUtil').is;
var inherits = require('inherits');
var showPropertiesPanel = require('./Utils').showPropertiesPanel;
var PropertiesActivator = require('bpmn-js-properties-panel/lib/PropertiesActivator');

var createManualTaskGroups = require('./tabs/manualTaskTab');
var createServiceTaskGroups = require('./tabs/serviceTaskTab');
var createSubProcessGroups = require('./tabs/subProcessTab');
var createParallelGatewayGroups = require('./tabs/parallelGatewayTab');
var createToolInitGroups = require('./tabs/toolInitTab');
var createPushTaskGroups = require('./tabs/pushTab');

// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
//import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
//import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
//import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
//import documentationProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps';
var idProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps');
var nameProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps');

// Require your custom property entries.
var descriptionProps = require('./parts/descriptionProps'),
    linkProps = require('./parts/linkProps'),
    groupNameProps = require('./parts/groupNameProps'),
    ownerProps = require('./parts/ownerProps'),
    submitVarNameProps = require('./parts/submitVarNameProps'),
    isTaskOwnerProps = require('./parts/isTaskOwnerProps'),
    isSkipProps = require('./parts/isSkipProps');

var formProps = require('./parts/formProps');


// The general tab contains all bpmn relevant properties.
// The properties are organized in groups.
function createGeneralTabGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler, qflow_arith) {

    if (showPropertiesPanel(element)) {

        var generalGroup = {
            id: 'general',
            label: '基础属性',
            entries: []
        };

        idProps(generalGroup, element, translate);
        nameProps(generalGroup, element, bpmnFactory, null, translate);

        //descriptionProps(generalGroup, element, translate, elementRegistry);
        //linkProps(generalGroup,  element, translate, elementRegistry);
        //groupNameProps(generalGroup, element, translate, elementRegistry);
        //submitVarNameProps(generalGroup, element, translate, elementRegistry);
        isSkipProps(generalGroup, element, translate, elementRegistry);

        /*
        var operateGroup = {
            id: 'operate',
            label: '操作属性',
            entries: []
        };
        */
        
        //ownerProps(operateGroup, element, translate, elementRegistry, qflow_modeler);
        //isTaskOwnerProps(operateGroup, element, translate, elementRegistry, qflow_modeler, qflow_arith);


        return[
            generalGroup,
            //operateGroup,
        ];
    }

    return [];
}

// Create the custom magic tab
function createFormTabGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler) {

  if (showPropertiesPanel(element)) {

    var generalGroup = {
        id: 'general',
        label: '表单总览',
        entries: []
    };

    formProps(generalGroup, element, bpmnFactory, translate, elementRegistry, qflow_modeler);

    return [
        generalGroup
    ];

  }

  return [];

}

function QflowPropertiesProvider(eventBus, bpmnFactory, elementRegistry,  
  translate, qflow_modeler, qflow_arith, qflow_render) {

  PropertiesActivator.call(this, eventBus);

  this.getFlowNodeTabs = function(element){

    var generalTab = {
      id: 'general',
      label: '步骤属性',
      groups: createGeneralTabGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler, qflow_arith)
    };
    
    // The "步骤字段" tab
    var fieldTab = {
      id: 'field',
      label: '步骤表单',
      groups: createFormTabGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler)
    };

    var property_tab_list = [
      generalTab,
      fieldTab,
    ];

    var manualTaskGroups = createManualTaskGroups(element, bpmnFactory, elementRegistry, translate);
    var serviceTaskGroups = createServiceTaskGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler, qflow_arith);
    var subProcessGroups = createSubProcessGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler, qflow_arith, qflow_render);
    var parallelGatewayGroups = createParallelGatewayGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler, qflow_arith);
    var pushTaskGroups = createPushTaskGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler, qflow_arith);

    //console.log("manualTaskGroups : ", manualTaskGroups);
    //console.log("serviceTaskGroups : ", serviceTaskGroups);

    if(manualTaskGroups.length > 0){

        var specialTab = {
          id : "special",
          label : "步骤审批",
          groups: manualTaskGroups
        }

        property_tab_list.push(specialTab);

    }
    else if(serviceTaskGroups.length > 0)
    {

        var specialTab = {
          id : "special",
          label : "步骤工具",
          groups: serviceTaskGroups
        }

        property_tab_list.push(specialTab);
    }
    else if(subProcessGroups.length > 0)
    {

        var specialTab = {
          id : "special",
          label : "步骤子流程",
          groups: subProcessGroups
        }

        property_tab_list.push(specialTab);
    }
    else if(parallelGatewayGroups.length > 0)
    {

        var specialTab = {
          id : "special",
          label : "步骤分支",
          groups: parallelGatewayGroups
        }

        property_tab_list.push(specialTab);
    }
    else if(pushTaskGroups.length > 0)
    {

        var specialTab = {
          id : "special",
          label : "步骤推送",
          groups: pushTaskGroups
        }

        property_tab_list.push(specialTab);
    }

    console.log("property_tab_list : ", property_tab_list)

    return property_tab_list;


  }

  this.getStartEventTabs = function(element){

    var toolInitTab = {
      id: 'taskInit',
      label: '初始化工具',
      groups: createToolInitGroups(element, bpmnFactory, elementRegistry, translate, qflow_modeler, qflow_arith)
    };


    return [toolInitTab]

  }

  this.getTabs = function(element) {

    // if (is(element, 'bpmn:StartEvent')){

    //   return this.getStartEventTabs(element);

    // }

    return this.getFlowNodeTabs(element);

  };


}

QflowPropertiesProvider.$inject = [

  'eventBus',
  'bpmnFactory',
  'elementRegistry',
  'translate',
  'qflow_modeler',
  'qflow_arith',
  'qflow_render'
  
];

inherits(QflowPropertiesProvider, PropertiesActivator);

module.exports = QflowPropertiesProvider;