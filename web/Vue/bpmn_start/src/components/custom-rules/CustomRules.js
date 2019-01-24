import inherits from 'inherits';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
import BpmnRules from 'bpmn-js/lib/features/rules/BpmnRules';

/**
 * A custom rule provider that decides what elements can be
 * dropped where based on a `vendor:allowDrop` BPMN extension.
 *
 * See {@link BpmnRules} for the default implementation
 * of BPMN 2.0 modeling rules provided by bpmn-js.
 *
 * @param {EventBus} eventBus
 */
export default function CustomRules(eventBus) {
  BpmnRules.call(this, eventBus);
}

inherits(CustomRules, BpmnRules);

CustomRules.$inject = [ 'eventBus' ];



CustomRules.prototype.init = function() {

  console.log("shape one 123...");
  // there exist a number of modeling actions
  // that are identified by a unique ID. We
  // can hook into each one of them and make sure
  // they are only allowed if we say so
  this.addRule('shape.create', function(context) {

    var shape = context.shape,
        target = context.target;

    console.log("shape one create...");
    // we check for a custom vendor:allowDrop attribute
    // to be present on the BPMN 2.0 xml of the target
    // node
    //
    // we could practically check for other things too,
    // such as incoming / outgoing connections, element
    // types, ...
    var shapeBo = shape.businessObject,
        targetBo = target.businessObject;

    //var allowDrop = targetBo.get('vendor:allowDrop');

    //if (!allowDrop || !shapeBo.$instanceOf(allowDrop)) {
    //  return false;
    //}

    // not returning anything means other rule
    // providers can still do their work
    //
    // this allows us to reuse the existing BPMN rules
  });
};