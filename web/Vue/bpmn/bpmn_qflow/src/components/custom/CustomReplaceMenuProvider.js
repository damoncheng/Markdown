import inherits from 'inherits';

import {
    assign,
    forEach,
    isArray,
    bind,
    filter,
  } from 'min-dash';

  import {
    getBusinessObject,
    is
  } from 'bpmn-js/lib/util/ModelUtil';
  
  import {
    isEventSubProcess,
    isExpanded
  } from 'bpmn-js/lib/util/DiUtil';
  
  import {
    isDifferentType
  } from 'bpmn-js/lib/features/popup-menu/util/TypeUtil';
  

import ReplaceMenuProvider from  'bpmn-js/lib/features/popup-menu/ReplaceMenuProvider';

import * as replaceOptions from './ReplaceOptions';

export default function CustomeplaceMenuProvider(injector) {

    injector.invoke(ReplaceMenuProvider, this);
  
    var cached = bind(this.getEntries, this);

    this.getEntries = function(element) {

        var businessObject = element.businessObject;

        var rules = this._rules;

        var entries;

        if (!rules.allowed('shape.replace', { element: element })) {
            return [];
        }

        var differentType = isDifferentType(element);

        // start events outside event sub processes
        if (is(businessObject, 'bpmn:StartEvent') && !isEventSubProcess(businessObject.$parent)) {

            entries = filter(replaceOptions.START_EVENT, differentType);

            return this._createEntries(element, entries);
        }

        // expanded/collapsed pools
        if (is(businessObject, 'bpmn:Participant')) {

            entries = filter(replaceOptions.PARTICIPANT, function(entry) {
            return isExpanded(businessObject) !== entry.target.isExpanded;
            });

            return this._createEntries(element, entries);
        }

        // start events inside event sub processes
        if (is(businessObject, 'bpmn:StartEvent') && isEventSubProcess(businessObject.$parent)) {

            entries = filter(replaceOptions.EVENT_SUB_PROCESS_START_EVENT, function(entry) {

            var target = entry.target;

            var isInterrupting = target.isInterrupting !== false;

            var isInterruptingEqual = getBusinessObject(element).isInterrupting === isInterrupting;

            // filters elements which types and event definition are equal but have have different interrupting types
            return differentType(entry) || !differentType(entry) && !isInterruptingEqual;

            });

            return this._createEntries(element, entries);
        }

        // end events
        if (is(businessObject, 'bpmn:EndEvent')) {

            entries = filter(replaceOptions.END_EVENT, function(entry) {
            var target = entry.target;

            // hide cancel end events outside transactions
            if (target.eventDefinitionType == 'bpmn:CancelEventDefinition' && !is(businessObject.$parent, 'bpmn:Transaction')) {
                return false;
            }

            return differentType(entry);
            });

            return this._createEntries(element, entries);
        }

        // boundary events
        if (is(businessObject, 'bpmn:BoundaryEvent')) {

            entries = filter(replaceOptions.BOUNDARY_EVENT, function(entry) {

            var target = entry.target;

            if (target.eventDefinition == 'bpmn:CancelEventDefinition' &&
                !is(businessObject.attachedToRef, 'bpmn:Transaction')) {
                return false;
            }
            var cancelActivity = target.cancelActivity !== false;

            var isCancelActivityEqual = businessObject.cancelActivity == cancelActivity;

            return differentType(entry) || !differentType(entry) && !isCancelActivityEqual;
            });

            return this._createEntries(element, entries);
        }

        // intermediate events
        if (is(businessObject, 'bpmn:IntermediateCatchEvent') ||
            is(businessObject, 'bpmn:IntermediateThrowEvent')) {

            entries = filter(replaceOptions.INTERMEDIATE_EVENT, differentType);

            return this._createEntries(element, entries);
        }

        // gateways
        if (is(businessObject, 'bpmn:Gateway')) {

            entries = filter(replaceOptions.GATEWAY, differentType);

            return this._createEntries(element, entries);
        }

        // transactions
        if (is(businessObject, 'bpmn:Transaction')) {

            entries = filter(replaceOptions.TRANSACTION, differentType);

            return this._createEntries(element, entries);
        }

        // expanded event sub processes
        if (isEventSubProcess(businessObject) && isExpanded(businessObject)) {

            entries = filter(replaceOptions.EVENT_SUB_PROCESS, differentType);

            return this._createEntries(element, entries);
        }

        // expanded sub processes
        if (is(businessObject, 'bpmn:SubProcess') && isExpanded(businessObject)) {

            entries = filter(replaceOptions.SUBPROCESS_EXPANDED, differentType);

            return this._createEntries(element, entries);
        }

        // collapsed ad hoc sub processes
        if (is(businessObject, 'bpmn:AdHocSubProcess') && !isExpanded(businessObject)) {

            entries = filter(replaceOptions.TASK, function(entry) {

            var target = entry.target;

            var isTargetSubProcess = target.type === 'bpmn:SubProcess';

            var isTargetExpanded = target.isExpanded === true;

            return isDifferentType(element, target) && (!isTargetSubProcess || isTargetExpanded);
            });

            return this._createEntries(element, entries);
        }

        // sequence flows
        if (is(businessObject, 'bpmn:SequenceFlow')) {
            return this._createSequenceFlowEntries(element, replaceOptions.SEQUENCE_FLOW);
        }

        // flow nodes
        if (is(businessObject, 'bpmn:FlowNode')) {
            entries = filter(replaceOptions.TASK, differentType);

            // collapsed SubProcess can not be replaced with itself
            if (is(businessObject, 'bpmn:SubProcess') && !isExpanded(businessObject)) {
            entries = filter(entries, function(entry) {
                return entry.label !== 'Sub Process (collapsed)';
            });
            }

            return this._createEntries(element, entries);
        }

        return [];
    }

    this.getHeaderEntries = function(element) {

        return [];
    }

}

inherits(CustomeplaceMenuProvider, ReplaceMenuProvider);

CustomeplaceMenuProvider.$inject = [
    'injector'
];


