'use strict';

var inherits = require('inherits');

var PropertiesActivator = require('bpmn-js-properties-panel/lib/PropertiesActivator');
var createApprovalTabGroups = require('./tabs/approvalTab');
var createToolTabGroups = require('./tabs/toolTab');
var showPropertiesPanel = require('./Utils').showPropertiesPanel;


// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
//import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
//import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
//import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
//import documentationProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps';
//import { is } from 'bpmn-js/lib/util/ModelUtil';
var idProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps');
var nameProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps');

// Require your custom property entries.
//import nameProps from './parts/nameProps';
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
function createGeneralTabGroups(element, bpmnFactory, elementRegistry, translate) {

    if (showPropertiesPanel(element)) {

        var generalGroup = {
            id: 'general',
            label: '基础属性',
            entries: []
        };

        idProps(generalGroup, element, translate);
        nameProps(generalGroup, element, translate);

        descriptionProps(generalGroup, element, translate, elementRegistry);
        linkProps(generalGroup,  element, translate, elementRegistry);
        groupNameProps(generalGroup, element, translate, elementRegistry);
        isSkipProps(generalGroup, element, translate, elementRegistry);

        var operateGroup = {
            id: 'operate',
            label: '操作属性',
            entries: []
        };
        
        ownerProps(operateGroup, element, translate, elementRegistry);
        isTaskOwnerProps(operateGroup, element, translate, elementRegistry);

        var toolGroup = {
            id: 'tool',
            label: '工具属性',
            entries: []
        };

        submitVarNameProps(toolGroup, element, translate, elementRegistry);

        
        //processProps(generalGroup, element, translate);

        /*
        var detailsGroup = {
            id: 'details',
            label: 'Details',
            entries: []
        };
        linkProps(detailsGroup, element, translate);
        eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate);

        var documentationGroup = {
            id: 'documentation',
            label: 'Documentation',
            entries: []
        };

        documentationProps(documentationGroup, element, bpmnFactory, translate);
        */

        return[
            generalGroup,
            operateGroup,
            toolGroup
        ];
    }

    return [];
}

// Create the custom magic tab
function createFormTabGroups(element, bpmnFactory, elementRegistry, translate) {

  if (showPropertiesPanel(element)) {

    var generalGroup = {
        id: 'general',
        label: '表单总览',
        entries: []
    };

    formProps(generalGroup, element, bpmnFactory, translate, elementRegistry);

    return [
        generalGroup
    ];

  }

  return [];

}


function QflowPropertiesProvider(
    eventBus, bpmnFactory, elementRegistry,
    translate, qflow_product) {

  console.log("#-----qflow_product", qflow_product);

  PropertiesActivator.call(this, eventBus);

  this.getTabs = function(element) {

    var generalTab = {
      id: 'general',
      label: '步骤属性',
      groups: createGeneralTabGroups(element, bpmnFactory, elementRegistry, translate)
    };

    
    // The "步骤字段" tab
    var fieldTab = {
      id: 'field',
      label: '步骤表单',
      groups: createFormTabGroups(element, bpmnFactory, elementRegistry, translate)
    };

    var properties_tab_list = [
        generalTab,
        fieldTab,
    ];


    var approvalGroups = createApprovalTabGroups(element, bpmnFactory, elementRegistry, translate);

    if(approvalGroups) {

        var approvalTab = {

            id : 'approval',
            label : '步骤审批',
            groups: approvalGroups

        }

        properties_tab_list.push(approvalTab);

    }

    // Show general + "magic" tab
    return properties_tab_list;

  };

}

QflowPropertiesProvider.$inject = [
    'eventBus', 
    'bpmnFactory', 
    'elementRegistry',
    'translate',
    'qflow_product'
];

inherits(QflowPropertiesProvider, PropertiesActivator);

module.exports = QflowPropertiesProvider;