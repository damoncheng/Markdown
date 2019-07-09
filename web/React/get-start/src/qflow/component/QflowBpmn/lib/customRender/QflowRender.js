var getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;

export default function QflowRender(qflow_modeler){

    this._qflow_modeler = qflow_modeler;

}

QflowRender.prototype.render_li = function(li_class, li_title, li_value){

    if(!li_class)
        li_class = "el-icon-self-circle";

    return `<li style="margin-bottom:5px;list-style-type:none;">
    
        <span class="${li_class}" title="${li_title}" style="cursor:pointer"></span>  ${li_value}

    </li>`

}



QflowRender.prototype.render_param_li = function(submit_var_name, one_shape = null, one_field = null, field_name= false){


    if(one_shape && one_field){
        
        var bo = getBusinessObject(one_shape);

        if(field_name){
            var title = `字段名 : 来自于步骤{{${bo.name}}}中字段{{${one_field.name}}}`;
        }else{
            var title = `字段变量名 : 来自于步骤{{${bo.name}}}中字段{{${one_field.name}}}`;
        }


        var li_class = "el-icon-success";


    }else if(one_shape){

        var bo = getBusinessObject(one_shape);

        var title = `步骤责任人变量名: 来自于步骤{{${bo.name}}}`;

        var li_class = "el-icon-success";

    }
    else if(this._qflow_modeler.qflow_basic.system_params.includes(submit_var_name)) {

        var title = "系统内置变量名"
        var li_class = "el-icon-success";

    }else{

        var title = "未找到参数对应变量名"
        var li_class = "el-icon-error";


    }

    return this.render_li(li_class, title, submit_var_name);

}

QflowRender.$inject = [

    'qflow_modeler',
        
]
