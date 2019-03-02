qflow_descriptor = {

    "start" : {"name" : "bpmn2:startEvent"},

    "step" : { 
        
        "shape" : ["bpmn2:userTask", "bpmn2:parallelGateway", "bpmn2:serviceTask", "bpmn2:manualTask"], 
    
        "connection" : "bpmn2:sequenceFlow",

        "field" : "qflow:formField"
        
    },

    "annotation" : {
    
        "name" : "bpmn2:textAnnotation",

        "connection" : "bpmn2:association",

        "content" : "bpmn2:text"

    }
        
        
}
