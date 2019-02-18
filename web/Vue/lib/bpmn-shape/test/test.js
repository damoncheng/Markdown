import {
  bootstrapModeler,
  inject
} from '../lib/TestHelper';

import coreModule from 'bpmn-js/lib/core';
import bpmnPaletteModule from 'bpmn-js/lib/features/palette';
import modelingModule from 'bpmn-js/lib/features/modeling';

import customRulesModule from '../lib/custom-rules';

describe('custom-rules', function(){

  var testModules = [
    // prepend our custom rules to hook into the
    // rule evaluation before the default rules
    // get applied
    customRulesModule,

    // add default interaction features
    coreModule,
    modelingModule,
    bpmnPaletteModule
  ];

  var diagramXML = require('./diagram.bpmn');

  beforeEach(bootstrapModeler(diagramXML, {
    modules: testModules
  }));

  describe('shape.create', function() {

    it('should reject per default', inject(
      function(rules, canvas, elementRegistry, elementFactory) {

        // given
        var newEventShape = elementFactory.create('shape', { type: 'bpmn:StartEvent', id: 'new_start', x : 100, y : 100 });
        var newTaskShape = elementFactory.create('shape', { type: 'bpmn:Task', id: 'new_task', x : 100, y : 200 });
        var targetElement = elementRegistry.get('SequenceFlow_1');

        canvas.addShape(newEventShape);
        canvas.addShape(newTaskShape);

        // when
        var canCreate = rules.allowed('shape.create', {
          shape: newEventShape,
          target: targetElement
        });

        // then
        expect(canCreate).to.be.false;
      }
    ));

  });

});
