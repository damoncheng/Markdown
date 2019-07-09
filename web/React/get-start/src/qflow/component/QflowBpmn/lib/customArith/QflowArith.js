import { Shape , Connection } from  'diagram-js/lib/model';

var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;
var formHelper = require('../customPanel/helper/formHelper');

export default function QflowArith(elementRegistry, qflow_modeler, qflow_render){

    this._elementRegistry = elementRegistry;
    this._qflow_modeler = qflow_modeler;
    this._qflow_render = qflow_render;

}

QflowArith.prototype.hello = function(){
    //console.log("hello qflow arith...")
}


//获取开始步骤过滤器
QflowArith.prototype.startEventFilter = function(element, gfx) {
    
    if(element.type == "bpmn:StartEvent") {
      return true;
    }

    return false;
}

//获取结束步骤过滤器
QflowArith.prototype.endEventFilter = function(element, gfx) {
    
    if(element.type == "bpmn:EndEvent") {
      return true;
    }

    return false;

}

//获取步骤连接过滤器
QflowArith.prototype.connectionFilter = function(element, gfx) {
    
    //console.log("element : ", element);

    if(
       (Object.getPrototypeOf(element).constructor == Connection)
       && (element.type == "bpmn:SequenceFlow")
    ) {
      return true;
    }

    return false;
}

//获取所有步骤过滤器
QflowArith.prototype.shapeFilter = function(element, gfx) {
    
    //console.log("element : ", element);

    if(
       (Object.getPrototypeOf(element).constructor == Shape)
    ) {
      return true;
    }

    return false;
}


QflowArith.prototype.check_start_shape_overlay = function(){

    let shape_list = this._elementRegistry.filter(this.shapeFilter);
    let start_shape_list = this._elementRegistry.filter(this.startEventFilter);


    if((shape_list.length == 1) && (start_shape_list.length > 0)){
        return start_shape_list[0]
    }

    return undefined;

}

//获取步骤依赖关系
QflowArith.prototype.get_vertex_relation_dict = function(relations_list){

    var vertex_relations_dict = {};

    //初始化vertex_relations_dict
    for(let index in relations_list)
    {
        if(!(relations_list[index][0] in vertex_relations_dict))
            vertex_relations_dict[relations_list[index][0]] = []

        if(!(relations_list[index][1] in vertex_relations_dict))
            vertex_relations_dict[relations_list[index][1]] = []

        //这儿和后端引擎用了相反的方式 : to : from_list
        if(vertex_relations_dict[relations_list[index][1]].indexOf(relations_list[index][0]) == -1)
            vertex_relations_dict[relations_list[index][1]].push(relations_list[index][0])
    }


    return vertex_relations_dict;

}


QflowArith.prototype.loopCheck = function(relations_list) {

    //console.log("relations_list : ", relations_list);

    //console.log(JSON.stringify(relations_list))

    var ret = {
      "loop" : false,
      "vertex_top_step_order" : []
    }

    var vertex_no_in_edge = [];
    var vertex_top_step_order = [];
    var vertex_relations_dict = this.get_vertex_relation_dict(relations_list);
    

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

QflowArith.prototype.get_shape_top_order_dict = function(){

    var relation_list = this.get_modeler_relation_list();
    var vertex_relations_dict = this.get_vertex_relation_dict(relation_list);

    return vertex_relations_dict;

}

QflowArith.prototype.get_shape_top_order_list = function(){

    var shape_top_order_list = [];

    var shape_list =  this._elementRegistry.filter(this.shapeFilter);
    var relation_list = this.get_modeler_relation_list();
    var loop_ret = this.loopCheck(relation_list);


    if(!loop_ret["loop"]){

        for(let one_shape_id of loop_ret["vertex_top_step_order"])
        {

            for(let one_shape of shape_list){

                if(one_shape.id == one_shape_id){

                    if(one_shape.type != "bpmn:StartEvent") {
                        shape_top_order_list.push(one_shape);
                    }
                    break

                }

            }

        }

    }
    else{
        console.log("loop exist...")
    }

    
    return shape_top_order_list;


}

//递归获取步骤所有祖先元素id（包括自己）
QflowArith.prototype.get_ancestor_list = function(vertex, vertex_relations_dict, target_ancestor_list){

    target_ancestor_list.push(vertex);

    if(!(vertex in vertex_relations_dict) || vertex_relations_dict[vertex].length == 0)
        return;

    for(let one_vertex of vertex_relations_dict[vertex])
    {
        this.get_ancestor_list(one_vertex, vertex_relations_dict, target_ancestor_list); 
    }

}

/** for CustomRule */
QflowArith.prototype.getRelationList = function(source, target, exclude_connection){

    var relations_list = [];

    var connection_filtered =  this._elementRegistry.filter(this.connectionFilter);

    //console.log("connection_filter : ", connection_filtered);

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

QflowArith.prototype.get_element_branch_li = function(element){

    var branch_shape_li_list = [];

    var branch_shape_list = this.get_element_branch(element);

    for(let one_shape of branch_shape_list){

        var bo = getBusinessObject(one_shape);

        //获取branch渲染list
        branch_shape_li_list.push(this._qflow_render.render_li(
            "", "", bo.name
        ));

    }

    return branch_shape_li_list;


}

/** for CustomPropertyPanel */
//获取指定元素分支步骤
QflowArith.prototype.get_element_branch = function(element){

    var connection_filtered =  this._elementRegistry.filter(this.connectionFilter);

    if(this._qflow_modeler.debug)
        console.log("connection_filtered : ", connection_filtered);

    var child_shape_list = [];
    var branch_shape_list = [];

    for(let one_connection of connection_filtered){

        if(one_connection.source.id == element.id){
            child_shape_list.push(one_connection.target);
        }

    }

    if(this._qflow_modeler.debug)
        console.log("child_shape_list : ", child_shape_list);

    var shape_top_order_dict = this.get_shape_top_order_dict();

    if(this._qflow_modeler.debug)
        console.log("shape_top_order_dict : ", shape_top_order_dict);

    for(let one_shape of child_shape_list){

        if(
            one_shape.id in shape_top_order_dict &&
            shape_top_order_dict[one_shape.id].length == 1 &&
            shape_top_order_dict[one_shape.id][0] == element.id
        ){
            branch_shape_list.push(one_shape);
        }

    }

    if(this._qflow_modeler.debug)
        console.log("branch_shape_list : ", branch_shape_list);


    return branch_shape_list;

}

//获取工具参数渲染字典 : 字段变量名 => render_li
QflowArith.prototype.get_rendered_element_params = function(element, params, step_mode="ancestor", step_filter={}, field_filter={}, field_name=false){

    //console.log("params : ", params);

    var check_element_id_list = [];

    if(step_mode == "ancestor"){
        //按依赖关系顺序寻找：近距离 > 远距离
        check_element_id_list = this.get_element_ancestor(element);
    }
    else if(step_mode == "shape"){
        //获取所有shape
        check_element_id_list = this.get_all_shape();
    }


    //console.log("check_element_id_list : ", check_element_id_list);
    //check_element_id_list = [element.id].concat(check_element_id_list);

    var params_dict = this.get_element_params(check_element_id_list, params, step_filter, field_filter, field_name);

    for(let one_param of params){
        if(!(one_param in params_dict)){
            params_dict[one_param] = this._qflow_render.render_param_li(one_param)
        }
    }

    if(this._qflow_modeler.debug)
        console.log("params_dict : ", params_dict);

    return params_dict;

}

//基于check_element_id_list优先级, 获取指定元素列表参数字典
QflowArith.prototype.get_element_params = function(check_element_id_list, params, step_filter={}, field_filter={}, field_name=false){

    var params_dict = {}

    var shape_filtered =  this._elementRegistry.filter(this.shapeFilter);

    for(let one_shape of shape_filtered){

        //console.log("one_shape_id : ", one_shape.id)

        if(check_element_id_list.includes(one_shape.id)){

            let field_list = formHelper.getFormFields(one_shape);

            //console.log("----field_list : ", field_list)

            for(let one_field of field_list){

                //field filter
                var filter_result = true;
                for(let one_filter in field_filter){

                    if(one_field[one_filter])
                        filter_result = (one_field[one_filter] == field_filter[one_filter]);

                    if(!filter_result)
                        break
                }

                if(!filter_result)
                    continue

                if(field_name){

                if(
                    field_name &&
                    one_field.name &&
                    params.includes(one_field.name) &&
                    !(one_field.name in params_dict)
                ){
                    params_dict[one_field.name] = this._qflow_render.render_param_li(one_field.name, one_shape, one_field, field_name);
                }

                }

                if(
                    one_field.submit_var_name &&
                    params.includes(one_field.submit_var_name)  &&
                    !(one_field.submit_var_name in params_dict)
                ){
                    params_dict[one_field.submit_var_name] = this._qflow_render.render_param_li(one_field.submit_var_name, one_shape, one_field);
                }
            }

        }

        //step filter
        var filter_result = true;
        for(let one_filter in step_filter){

            if(one_shape[one_filter])
                filter_result = (one_shape[one_filter] == step_filter[one_filter]);

            if(!filter_result)
                break
        }

        if(!filter_result)
            continue

        var bo = getBusinessObject(one_shape);

        if(
            bo.submit_var_name &&
            params.includes(("_step_owner_" + bo.submit_var_name))  &&
            !(("_step_owner_" + bo.submit_var_name) in params_dict)
        ){
            params_dict["_step_owner_" + bo.submit_var_name] = this._qflow_render.render_param_li("_step_owner_" + bo.submit_var_name, one_shape);
        }

    }

    return params_dict;

}

/**获取所有步骤id列表 */
QflowArith.prototype.get_all_shape = function(){

    var shape_id_list = [];

    var shape_filtered =  this._elementRegistry.filter(this.shapeFilter);

    for(let one_shape of shape_filtered){
        shape_id_list.push(one_shape.id);
    }

    return shape_id_list;

}

/**获取指定元素祖先元素element列表（不包括自己） */
QflowArith.prototype.get_element_ancestor_list = function(element) {

    var element_ancestor_dict = {};
    var element_ancestor_list = [];

    var element_ancestor_id_list = this.get_element_ancestor(element);

    var shape_filtered =  this._elementRegistry.filter(this.shapeFilter);

    for(let one_shape of shape_filtered){
        element_ancestor_dict[one_shape.id] = one_shape
    }

    for(let one_shape_id of element_ancestor_id_list){

        if(one_shape_id == element.id)
            continue

        if(one_shape_id in element_ancestor_dict){

            element_ancestor_list.push(element_ancestor_dict[one_shape_id])

        }

    }
    
    return element_ancestor_list;

}

/* 获取祖先元素id列表 (包括元素自己)*/
QflowArith.prototype.get_element_ancestor = function(element) {

    var relation_list = this.get_modeler_relation_list();
    var vertex_relations_dict = this.get_vertex_relation_dict(relation_list);

    var target_ancestor_id_list = [];
    this.get_ancestor_list(element.id, vertex_relations_dict, target_ancestor_id_list);

    return target_ancestor_id_list;

}

/*获取步骤关系列表 */
QflowArith.prototype.get_modeler_relation_list = function(){

    var relations_list = [];

    var connection_filtered =  this._elementRegistry.filter(this.connectionFilter);

    //console.log("connection_filter : ", connection_filtered);

    for(let one_connection of connection_filtered){

        var one_relation = [
            one_connection.businessObject.sourceRef.id,
            one_connection.businessObject.targetRef.id
        ];

        relations_list.push(one_relation);

    }

    return relations_list;

}


QflowArith.$inject = [

    'elementRegistry',
    'qflow_modeler',
    'qflow_render',
        
]
