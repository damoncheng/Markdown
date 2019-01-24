import '../TestHelper';

import TestContainer from 'mocha-test-container-support';

import CustomModeler from '../../app/custom-modeler'

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import OriginModule from 'diagram-js-origin';
import minimapModule from 'diagram-js-minimap';


import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';

describe('custom modeler', function(){

	var xml = require('./diagram.bpmn');

	var container;

	beforeEach(function(){

		container = TestContainer.get(this);

	});

	describe('start custom modeler', function(){
	
		var modeler;

		beforeEach(function(done) {

		
			modeler = new CustomModeler(
				{ 
					container : container,
					additionalModules: [

					  OriginModule,
					  minimapModule,
					  
					]
				}
			);

			modeler.importXML(xml, function(err) {
			
				if(!err) {
					done();
				}

			});
		
		});

		it("create custom modeler", function(){
			expect(true).to.be.true;
		});

        it("create custom modeler element", function(){

			  // given
			  var elementRegistry = modeler.get('elementRegistry'),
				  customElements = modeler.getCustomElements();

			  // when
			  var customElement = {
				type: 'custom:triangle',
				id: 'CustomTriangle_1',
				x: 300,
				y: 200
			  };

			  modeler.addCustomElements([ customElement ]);
			  var customTriangle = elementRegistry.get('CustomTriangle_1');

			  // then
			  expect(is(customTriangle, 'custom:triangle')).to.be.true;

			  //expect(customTriangle).to.exist;
			  //expect(customElements).to.contain(customElement);

		});

	});

});
