import inherits from 'inherits';

import {
  pick,
  assign
} from 'min-dash';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import {
  add as collectionAdd,
  remove as collectionRemove
} from 'diagram-js/lib/util/Collections';

/**
 * A handler responsible for updating the custom element's businessObject
 * once changes on the diagram happen.
 */
export default function CustomUpdater(eventBus, modeling, bpmnjs) {

  CommandInterceptor.call(this, eventBus);

  function canCustomElement(e) {
      //console.log("#----canCustomElement");

      return false;
  }

  function updateCustomElement(e) {
      //console.log("#----updateCustomElement");

      return true;
  }

  function updateCustomConnection(e) {
      //console.log("#----updateCustomConnection");

      return true;
  }

  this.executed([
      'shape.delete'
    ], ifCustomElement(canCustomElement));

  this.executed([
    'shape.create',
    'shape.move',
    'shape.delete'
  ], ifCustomElement(updateCustomElement));

  this.reverted([
    'shape.create',
    'shape.move',
    'shape.delete'
  ], ifCustomElement(updateCustomElement));
  

  this.executed([
    'connection.create',
    'connection.reconnectStart',
    'connection.reconnectEnd',
    'connection.updateWaypoints',
    'connection.delete',
    'connection.layout',
    'connection.move'
  ], ifCustomElement(updateCustomConnection));

  this.reverted([
    'connection.create',
    'connection.reconnectStart',
    'connection.reconnectEnd',
    'connection.updateWaypoints',
    'connection.delete',
    'connection.layout',
    'connection.move'
  ], ifCustomElement(updateCustomConnection));

}
  
inherits(CustomUpdater, CommandInterceptor);

CustomUpdater.$inject = [ 'eventBus', 'modeling', 'bpmnjs' ];


function ifCustomElement(fn) {

    return function(event) {
      var context = event.context,
          element = context.shape || context.connection;

      if(!fn(event))
        return false;

    };

}
