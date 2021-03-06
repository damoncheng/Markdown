#coding:utf-8

qflow_descriptor = {

    "shape" : [
        
        {"type" : "bpmn2:startEvent", "category" : "start"},

        {"type" : "bpmn2:userTask", "category" : "task"}, 
        
        {"type" : "bpmn2:parallelGateway", "category" : "gateway"}, 
        
        {"type" : "bpmn2:serviceTask", "category" : "task"}, 
        
        {"type" : "bpmn2:manualTask", "category" : "task"}
        
    ], 

    "connection" : { "type" : "bpmn2:sequenceFlow" },

    "content" : { 
        
        "type" : "qflow:formField",

        "attrs" : [

            {"name" : "id"},
            {"name" : "name", "default" : u"未命名"},
            {"name" : "link", "default" : u""},
            {"name" : "submit_var_name", "default" : u""},
            {"name" : "description", "default" : u""},
            {"name" : "field_type", "default" : u"input"},
            {"name" : "default_value", "default" : u""},
            {"name" : "is_required", "default" : u"Y"},
            {"name" : "is_on_task_top", "default" : u"N"},
            {"name" : "is_on_apply_fill", "default" : u"N"},
            {"name" : "is_pushed", "default" : u"N"},
            {"name" : "is_inherited", "default" : u"N"},
            {"name" : "is_task_name", "default" : u"N"},
            {"name" : "is_encrypt", "default" : u"N"},
            
        ]
        
    },

    "attrs" : [ 
        
        {"name" : "name", "default" : u"未命名"},
        {"name" : "description", "default" : u""},
        {"name" : "link" , "default" : u""},
        {"name" : "group_name" , "default" : u""},
        {"name" : "submit_var_name" , "default" : u""},
        {"name" : "owner" , "default" : u""},
        {"name" : "is_task_owner" , "default" : "0"},
        {"name" : "is_skip" , "default" : "N"}
        
    ],

    "extension" : {

        "bpmn2:serviceTask" : {
            
            "type" : "qflow:serviceTask",

            "attrs" : [

                {"name" : "tool_id", "default" : u"-1"},
                
            ]

        },

        "bpmn2:manualTask" : {
            
            "type" : "qflow:manualTask",

            "attrs" : [


                {"name" : "success", "default" : u"通过"},
                {"name" : "fail", "default" : u"不通过"},
                
            ]

        }
            
    }

    
    #"annotation" : {
    #    "type" : "bpmn2:textAnnotation",
    #    "connection" : {"type" : "bpmn2:association"},
    #    "content" : {"type" : "bpmn2:text"}
    #}
        
        
}
