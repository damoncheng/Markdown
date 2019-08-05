import inherits from 'inherits';

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';
//import BpmnRules from    'bpmn-js/lib/features/rules/BpmnRules';
import { Shape , Connection } from  'diagram-js/lib/model';
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from 'constants';


/**
 * A custom rule provider that decides what elements can be
 * dropped where based on a `vendor:allowDrop` BPMN extension.
 *
 * See {@link BpmnRules} for the default implementation
 * of BPMN 2.0 modeling rules provided by bpmn-js.
 *
 * @param {EventBus} eventBus
 */
export default function CustomRules(eventBus, elementRegistry, qflow_arith, selection) {

  this._eventBus = eventBus;
  this._elementRegistry = elementRegistry;
  this._qflow_arith = qflow_arith;
  this._selection = selection;

  //console.log("Shape : ", Shape);

  RuleProvider.call(this, eventBus);

}

inherits(CustomRules, RuleProvider);

CustomRules.$inject = ['eventBus', 'elementRegistry', 'qflow_arith', 'selection'];


CustomRules.prototype.init = function() {

  var HIGH_PRIORITY = 1500;
  
  var eventBus = this._eventBus;
  var elementRegistry = this._elementRegistry;
  var qflow_arith = this._qflow_arith;
  var selection = this._selection;


  var repeatCheck = function(source, target){

    var connection_filtered =  elementRegistry.filter(qflow_arith.connectionFilter);

    for(let one_connection of connection_filtered){


        if( (one_connection.businessObject.sourceRef.id == source.id)
            && (one_connection.businessObject.targetRef.id == target.id))
            return false;

    }

    return true;

  }

  var transmitCheck = function(source, target, exclude_connection){

    var relations_list = qflow_arith.getRelationList(source, target, exclude_connection);

    var vertex_relations_dict = qflow_arith.get_vertex_relation_dict(relations_list);

    //transmit check
    var target_ancestor_list = [];

    for(let one_vertex of vertex_relations_dict[target.id]){

        if(one_vertex == source.id)
            continue;

        qflow_arith.get_ancestor_list(one_vertex, vertex_relations_dict, target_ancestor_list);

    }

    if(target_ancestor_list.includes(source.id))
        return false;


    return true;

  }

  var invalidCheck = function(source, target, exclude_connection){

    //console.log("source : ", source);
    //console.log("target : ", target);

    if( 
       source &&
       target &&
       (Object.getPrototypeOf(source).constructor == Shape) && 
       (Object.getPrototypeOf(target).constructor == Shape) 
    ) {

        //repeat check
        if(!repeatCheck(source, target))
            return false;

        
        if(!transmitCheck(source, target, exclude_connection))
            return false;
        
    }

    return true;

  }

  var bpmnLoopCheck = function(source, target, exclude_connection){

    if( 
       source &&
       target &&
       (Object.getPrototypeOf(source).constructor == Shape) && 
       (Object.getPrototypeOf(target).constructor == Shape)
    ) {

        var relations_list = qflow_arith.getRelationList(source, target, exclude_connection);

        var ret = qflow_arith.loopCheck(relations_list);

        if(ret["loop"])
          return false;

    }

    return true;

  }



  this.addRule('shape.create', HIGH_PRIORITY, function(context) {

    var shape = context.shape,
        target = context.target;


    var shapeBo = shape.businessObject,
        targetBo = target.businessObject;

    var target_filtered = [];

    if(shapeBo.$type == "bpmn:StartEvent"){
      
      var start_filtered = elementRegistry.filter(qflow_arith.startEventFilter);

      for(let one_filter of start_filtered){
        
        if(one_filter.businessObject.$parent.id == targetBo.id){

           target_filtered.push(one_filter);
        
        }

      }


    }
    else if(shapeBo.$type == "bpmn:EndEvent"){

      var end_filtered = elementRegistry.filter(qflow_arith.endEventFilter);

      for(let one_filter of end_filtered){
        
        if(one_filter.businessObject.$parent.id == targetBo.id){

          target_filtered.push(one_filter);

        }

      }

    }

    //console.log("target_filtered length : ", target_filtered.length)
    if(target_filtered.length > 0){

      return false;
    
    }


    //var allowDrop = targetBo.get('vendor:allowDrop');

    //if (!allowDrop || !shapeBo.$instanceOf(allowDrop)) {
    //  return false;
    //}

    // not returning anything means other rule
    // providers can still do their work
    //
    // this allows us to reuse the existing BPMN rules
  });

  this.addRule('shape.attach', HIGH_PRIORITY, function(context) {

    //console.log("shape attach : ", context);

  });

  this.addRule('element.copy', HIGH_PRIORITY, function(context) {

     let element = context.element;

     if(element.type == "bpmn:StartEvent")
        return false;

  });

  this.addRule('elements.delete', HIGH_PRIORITY, function(context){

      var filter_elements = [];
      var delete_elements = context.elements;

      var selectedElements = selection.get();

      //console.log(selectedElements.length);
      //console.log("context ", context);

      for(let one_delete_element of delete_elements){

          if(one_delete_element.type == "bpmn:StartEvent")
            continue

          filter_elements.push(one_delete_element);

      } 

      //console.log("filter_elements : ", filter_elements);

      return filter_elements;

  });

  this.addRule('shape.attach', HIGH_PRIORITY, function(context) {

    //console.log("shape attach : ", context);

  });

  this.addRule('connection.create', HIGH_PRIORITY, function(context) {

    var source = context.source,
        target = context.target;


    //console.log("connection create : ", context);
  

    //loop check
    if(!bpmnLoopCheck(source, target))
        return false;

    if(!invalidCheck(source, target))
        return false;


  });

  this.addRule('connection.reconnectStart', HIGH_PRIORITY, function(context) {

    var connection = context.connection,
        source = context.hover || context.source,
        target = connection.target;

    //console.log("connection reconnectStart : ", context);
  
    //loop check
    if(!bpmnLoopCheck(source, target, connection))
        return false;

    if(!invalidCheck(source, target, connection))
        return false;


  });

  this.addRule('connection.reconnectEnd', HIGH_PRIORITY, function(context) {

    var connection = context.connection,
        source = connection.source,
        target = context.hover || context.target;

    //console.log("connection reconnectEnd : ", context);
    

    //loop check
    if(!bpmnLoopCheck(source, target, connection))
        return false;

    if(!invalidCheck(source, target. connection))
        return false;

  });


};
