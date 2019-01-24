import {
  bootstrapBpmnJS,
  inject
} from '../TestHelper';

import {
  assign
} from 'min-dash';

import CustomModeler from '../../app/custom-modeler';

describe('custom modeling', function() {

  var xml = require('./diagram.bpmn');

  beforeEach(bootstrapBpmnJS(CustomModeler, xml));

  describe('custom elements', function() {

    beforeEach(inject(function(bpmnjs) {

      var customShape = {
        type: 'custom:triangle',
        id: 'CustomTriangle_1',
        x: 300,
        y: 300
      };

      bpmnjs.addCustomElements([ customShape ]);

    }));

	/*

	it('should export custom element', inject(
      function(bpmnjs, elementRegistry, modeling) {

        // given
        var customElement = {
          type: 'custom:circle',
          id: 'CustomCircle_1',
          x: 200,
          y: 400
        };

        var position = { x: customElement.x, y: customElement.y },
            target = elementRegistry.get('Process_1');

        modeling.createShape(
          assign({ businessObject: customElement }, customElement),
          position,
          target
        );

        // when
        var customElements = bpmnjs.getCustomElements();

        // then
        expect(customElements).to.contain(customElement);
      }
    ));

	*/


	/*

	it('should not resize custom shape', inject(function(elementRegistry, rules) {

      // given
      var customElement = elementRegistry.get('CustomTriangle_1');

      // when
      var allowed = rules.allowed('resize', { shape: customElement });

      // then
      expect(allowed).to.be.false;
    }));


	*/
	
	it('should update custom element', inject(function(elementRegistry, modeling) {

      // given
      var customElement = elementRegistry.get('CustomTriangle_1');

      // when
      modeling.moveShape(customElement, { x: 200, y: 50 }, customElement.parent);

      // then
      expect(customElement.businessObject.x).to.equal(500);
      expect(customElement.businessObject.y).to.equal(350);
    }));


  });

});
