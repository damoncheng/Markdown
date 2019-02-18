import Modeler from 'bpmn-js/lib/Modeler';
import OriginModule from 'diagram-js-origin';
import minimapModule from 'diagram-js-minimap';

import {

	assign,
	isArray

} from 'min-dash';

import inherits from 'inherits';

import CustomModule from './custom';

export default function CustomModeler(options){

	Modeler.call(this, options);

	this._customElements = [];

}

inherits(CustomModeler, Modeler);

CustomModeler.prototype._modules = [].concat(
  CustomModeler.prototype._modules,
  [
    OriginModule,
    minimapModule,
    CustomModule
  ]
);

CustomModeler.prototype._addCustomShape = function(customElement){

	this._customElements.push(customElement);

	var canvas = this.get('canvas'),
		elementFactory = this.get('elementFactory');

	var customAttrs = assign( { businessObject : customElement }, customElement);

	var customShape = elementFactory.create('shape', customAttrs);

	return canvas.addShape(customShape);


}


CustomModeler.prototype._addCustomConnection = function(customElement){

	this._customElements.push(customElement);

	var canvas = this.get('canvas'),
		elementFactory = this.get('elementFactory'),
		elementRegistry = this.get('elementRegistory');

	var customAttrs = assign({ businessObject:customElement }, customElement);

	var connection = elementFactory.create('connection', assign(customAttrs, {
	
		source: elementRegistry.get(customElement.source),
		target: elementRegistry.get(customElement.target),
	
	}),
	elementRegistry.get(customElement.source).parent);

	return canvas.addConnection(connection);

}

CustomModeler.prototype.addCustomElements = function(customElements) {

	if(!isArray(customElements)){
		throw new Error('argument must be an array');
	}

	var shapes = [],
		connections = [];

	customElements.forEach(function(customElement){
	
		if(isCustomConnection(customElement)){

			connections.push(customElement);
		
		} else {

			shapes.push(customElement);
		
		}

	});


	shapes.forEach(this._addCustomShape, this);

	connections.forEach(this._addCustomConnection, this);

    console.log("add custom elements end");


};


CustomModeler.prototype.getCustomElements = function() {

	return this._customElements;

};


function isCustomConnection(element){
	return element.type === 'custom:connection';
};
