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
export default function CustomRules(eventBus, elementRegistry) {

  this._eventBus = eventBus;
  this._elementRegistry = elementRegistry;

  console.log("Shape : ", Shape);

  RuleProvider.call(this, eventBus);

}

inherits(CustomRules, RuleProvider);

CustomRules.$inject = [ 'eventBus', 'elementRegistry'];


CustomRules.prototype.init = function() {

  var HIGH_PRIORITY = 1500;
  
  var eventBus = this._eventBus;
  var elementRegistry = this._elementRegistry;

  var startEventFilter = function(element, gfx) {
    
      if(element.type == "bpmn:StartEvent") {
        return true;
      }

      return false;
  }

  var endEventFilter = function(element, gfx) {
    
    if(element.type == "bpmn:EndEvent") {
      return true;
    }

    return false;
  }

  var connectionFilter = function(element, gfx) {
    
    console.log("element : ", element);

    if(
       (Object.getPrototypeOf(element).constructor == Connection)
       && (element.type == "bpmn:SequenceFlow")
    ) {
      return true;
    }

    return false;
  }

  var getRelationList = function(source, target, exclude_connection){

    var relations_list = [];

    var connection_filtered =  elementRegistry.filter(connectionFilter);

    console.log("connection_filter : ", connection_filtered);

    for(let one_connection of connection_filtered){


        if(exclude_connection && (one_connection.id == exclude_connection.id))
            continue;

        
        var one_relation = [
            one_connection.businessObject.sourceRef.id,
            one_connection.businessObject.targetRef.id
        ];

        relations_list.push(one_relation);

    }

    relations_list.push([source.id, target.id]);

    return relations_list;

  }

  var get_vertex_relation_dict = function(relations_list){

    var vertex_relations_dict = {}

    //初始化vertex_relations_dict
    for(let index in relations_list)
    {
        if(!(relations_list[index][0] in vertex_relations_dict))
            vertex_relations_dict[relations_list[index][0]] = []

        if(!(relations_list[index][1] in vertex_relations_dict))
            vertex_relations_dict[relations_list[index][1]] = []

        if(vertex_relations_dict[relations_list[index][1]].indexOf(relations_list[index][0]) == -1)
            vertex_relations_dict[relations_list[index][1]].push(relations_list[index][0])
    }


    return vertex_relations_dict;

  }

  var get_ancestor_list = function(vertex, vertex_relations_dict, target_ancestor_list){

    target_ancestor_list.push(vertex);

    if(vertex_relations_dict[vertex].length == 0)
        return;

    for(let one_vertex of vertex_relations_dict[vertex])
    {
        get_ancestor_list(one_vertex, vertex_relations_dict, target_ancestor_list); 
    }

  }

  var repeatCheck = function(source, target){

    var connection_filtered =  elementRegistry.filter(connectionFilter);

    for(let one_connection of connection_filtered){


        if( (one_connection.businessObject.sourceRef.id == source.id)
            && (one_connection.businessObject.targetRef.id == target.id))
            return false;

    }

    return true;

  }

  var transmitCheck = function(source, target, exclude_connection){

    var relations_list = getRelationList(source, target, exclude_connection);

    var vertex_relations_dict = get_vertex_relation_dict(relations_list);

    //transmit check
    var target_ancestor_list = [];

    for(let one_vertex of vertex_relations_dict[target.id]){

        if(one_vertex == source.id)
            continue;

        get_ancestor_list(one_vertex, vertex_relations_dict, target_ancestor_list);

    }

    if(target_ancestor_list.includes(source.id))
        return false;


    return true;

  }

  var invalidCheck = function(source, target, exclude_connection){

    console.log("source : ", source);
    console.log("target : ", target);

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

  var loopCheck = function(relations_list) {

      console.log("relations_list : ", relations_list);

      //console.log(JSON.stringify(relations_list))

      var ret = {
        "loop" : false,
        "vertex_top_step_order" : []
      }

      var vertex_no_in_edge = [];
      var vertex_top_step_order = [];
      var vertex_relations_dict = get_vertex_relation_dict(relations_list);
      

      //console.log("vertex_no_in_edge:", JSON.stringify(vertex_no_in_edge))
      //console.log("before update vertex_relations_dict:", JSON.stringify(vertex_relations_dict))

      //更新vertex_no_in_edge
      for(let one_vertex in vertex_relations_dict)
          if(vertex_relations_dict[one_vertex].length == 0)
              vertex_no_in_edge.push(one_vertex)

      for(let index in vertex_no_in_edge)
      {
          //console.log("--vertex_no_in_edge[index]:", vertex_no_in_edge[index])
          for(let one_vertex in vertex_relations_dict)
          {
              //console.log("--vertex_relations_dict[one_vertex]:", vertex_relations_dict[one_vertex])
              //console.log(vertex_relations_dict[one_vertex].indexOf(vertex_no_in_edge[index]))
              if(vertex_relations_dict[one_vertex].indexOf(vertex_no_in_edge[index]) >= 0)
              {
                  //console.log("here")
                  for(var i = vertex_relations_dict[one_vertex].length-1;i>=0;i--)
                  {
                      if(vertex_relations_dict[one_vertex][i] == vertex_no_in_edge[index])
                      {
                          vertex_relations_dict[one_vertex].splice(i, 1)
                          console.log(i)
                      }
                  }
              }
          }
          delete vertex_relations_dict[vertex_no_in_edge[index]]
      }

      //console.log("vertex_no_in_edge:", JSON.stringify(vertex_no_in_edge))
      //console.log("before while vertex_relations_dict:", JSON.stringify(vertex_relations_dict))

      while(vertex_no_in_edge.length > 0)
      {

          //console.log("vertex_no_in_edge:", JSON.stringify(vertex_no_in_edge))
          //console.log("vertex_top_step_order:", JSON.stringify(vertex_top_step_order))

          vertex_top_step_order = vertex_top_step_order.concat(vertex_no_in_edge)
          vertex_no_in_edge = []

          for(let one_vertex in vertex_relations_dict)
              if(vertex_relations_dict[one_vertex].length == 0)
                  vertex_no_in_edge.push(one_vertex)

          for(let index in vertex_no_in_edge)
          {
              for(let one_vertex in vertex_relations_dict)
              {
                  if(vertex_relations_dict[one_vertex].indexOf(vertex_no_in_edge[index]) >= 0)
                  {
                      for(let i = vertex_relations_dict[one_vertex].length-1;i>=0;i--)
                      {
                          if(vertex_relations_dict[one_vertex][i] == vertex_no_in_edge[index])
                          {
                              vertex_relations_dict[one_vertex].splice(i, 1)
                          }
                      }
                  }
              }
              delete vertex_relations_dict[vertex_no_in_edge[index]]
          }

          //console.log("vertex_no_in_edge:", JSON.stringify(vertex_no_in_edge))
          //console.log("vertex_relations_dict:", JSON.stringify(vertex_relations_dict))
          //console.log("vertex_top_step_order:", JSON.stringify(vertex_top_step_order))
      }

      //console.log("after vertex_relations_dict", JSON.stringify(vertex_relations_dict))

      if(Object.keys(vertex_relations_dict).length > 0)
      {
          ret["loop"] = true
      }
      else
      {
          ret["vertex_top_step_order"] = vertex_top_step_order
      }

      return ret

  }

  var bpmnLoopCheck = function(source, target, exclude_connection){

    if( 
       source &&
       target &&
       (Object.getPrototypeOf(source).constructor == Shape) && 
       (Object.getPrototypeOf(target).constructor == Shape)
    ) {

        var relations_list = getRelationList(source, target, exclude_connection);

        var ret = loopCheck(relations_list);

        if(ret["loop"])
          return false;

    }

    return true;

  }

  // there exist a number of modeling actions
  // that are identified by a unique ID. We
  // can hook into each one of them and make sure
  // they are only allowed if we say so
  this.addRule('shape.create', HIGH_PRIORITY, function(context) {

    var shape = context.shape,
        target = context.target;

    console.log("shape create : ", context);

    // we check for a custom vendor:allowDrop attribute
    // to be present on the BPMN 2.0 xml of the target
    // node
    //
    // we could practically check for other things too,
    // such as incoming / outgoing connections, element
    // types, ...


    var shapeBo = shape.businessObject,
        targetBo = target.businessObject;

    var target_filtered = [];

    if(shapeBo.$type == "bpmn:StartEvent"){
      
      var start_filtered = elementRegistry.filter(startEventFilter);

      for(let one_filter of start_filtered){
        
        if(one_filter.businessObject.$parent.id == targetBo.id){

           target_filtered.push(one_filter);
        
        }

      }


    }
    else if(shapeBo.$type == "bpmn:EndEvent"){

      var end_filtered = elementRegistry.filter(endEventFilter);

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

    console.log("shape attach : ", context);

  });

  this.addRule('connection.create', HIGH_PRIORITY, function(context) {

    var source = context.source,
        target = context.target;


    console.log("connection create : ", context);
  

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

    console.log("connection reconnectStart : ", context);
  
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

    console.log("connection reconnectEnd : ", context);
    

    //loop check
    if(!bpmnLoopCheck(source, target, connection))
        return false;

    if(!invalidCheck(source, target. connection))
        return false;

  });


  this.addRule('shape.remove', HIGH_PRIORITY, function(context) {

    console.log("shape delete.....");

  });



};
