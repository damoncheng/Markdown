import inherits from 'inherits';

import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';

// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
//import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import documentationProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps';
import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
//import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';


// Require your custom property entries.
import nameProps from './parts/nameProps';
import descriptionProps from './parts/descriptionProps';
import linkProps from './parts/linkProps';
import groupNameProps from './parts/groupNameProps';
import ownerProps from './parts/ownerProps';
import submitVarNameProps from './parts/submitVarNameProps';
import isTaskOwnerProps from './parts/isTaskOwnerProps';
import isSkipProps from './parts/isSkipProps';

import formProps from './parts/formProps';

import {showPropertiesPanel} from './Utils';


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

export default function QflowPropertiesProvider(
    eventBus, bpmnFactory, elementRegistry,
    translate) {

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
    

    // Show general + "magic" tab
    return [
      generalTab,
      fieldTab,
    ];
  };


}

inherits(QflowPropertiesProvider, PropertiesActivator);