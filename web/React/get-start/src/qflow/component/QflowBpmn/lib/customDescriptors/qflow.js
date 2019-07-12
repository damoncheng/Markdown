const qflowModdleDescriptor = {

    "name": "qflow",
    "uri": "http://qflow",
    "prefix": "qflow",
    "xml": {
        "tagAlias": "lowerCase"
    },
    "types": [
        {
            "name": "InputOutputParameterDefinition",
            "isAbstract": true
        },
        {
            "name": "FormData",
            "superClass": [ "Element" ],
            "meta": {
              "allowedIn": [
                "bpmn:FlowNode"
              ]
            },
            "properties": [
              {
                "name": "fields",
                "type": "FormField",
                "isMany": true
              },
              {
                "name": "businessKey",
                "type": "String",
                "isAttr": true
              }
            ]
        }, 
        {
            "name": "FormField",
            "superClass": [ "Element" ],
            "properties": [
              {"name": "id","type": "String","isAttr": true},
              {"name": "name","type": "String","isAttr": true,"default": "未命名" },
              {"name": "link", "type": "String", "isAttr": true,"default" : ""},
              {"name": "submit_var_name", "type": "String", "isAttr": true,"default" : ""},
              {"name": "description", "type": "String", "isAttr": true,"default" : ""},
              {"name": "field_type","type": "String","isAttr": true,"default": "input"},
              {"name": "default_value", "type": "String", "isAttr": true, "default" : ""},
              {"name": "values","type": "Value","isMany": true},
              {"name": "is_required", "type": "Boolean", "isAttr": true, "default" : true},
              {"name": "is_on_task_top", "type": "Boolean", "isAttr": true, "default" : false},
              {"name": "is_on_apply_fill", "type": "Boolean", "isAttr": true, "default" : false},
            ]
        }, 
        {
            "name": "Value",
            "superClass": [
              "InputOutputParameterDefinition"
            ],
            "properties": [
              {
                "name": "name",
                "isAttr": true,
                "type": "String"
              },
              {
                "name": "value",
                "isBody": true,
                "type": "String"
              }
            ]
        },    
        {
          "name": "BewitchedFlowNode",
          "extends": [
            "bpmn:FlowNode"
          ],
          "properties": [
            {
                "name": "description",
                "type": "String", 
                "isAttr": true, 
                "default" : ""
            },
            {
                "name": "link",
                "type": "String", 
                "isAttr": true, 
                "default" : ""
            },
            {
                "name": "submit_var_name",
                "type": "String", 
                "isAttr": true, 
                "default" : ""
            },
            {
                "name": "owner",
                "type": "String", 
                "isAttr": true, 
                "default" : ""
            },
            {
                "name": "is_skip",
                "type": "String", 
                "isAttr": true, 
                "default" : "N"
            }
          ]
        },
        {
          "name": "ManualTask",
          "superClass": [ "Element" ],
          "meta": {
            "allowedIn": [
              "bpmn:ManualTask"
            ]
          },
          "properties": [
            {
              "name": "name",
              "type": "String",
              "isAttr": true,
              "default" : "审批"
            },
            {
              "name": "success",
              "type": "String",
              "isAttr": true,
              "default": "通过"
            },
            {
              "name": "fail",
              "type": "String",
              "isAttr": true,
              "default" : "不通过"
            }
          ]
      },
      {
        "name": "ServiceTask",
        "superClass": [ "Element" ],
        "meta": {
          "allowedIn": [
            "bpmn:ServiceTask"
          ]
        },
        "properties": [
          {
            "name": "tool_id",
            "type": "String",
            "isAttr": true,
            "default" : ""
          }
        ]
      },
      {
        "name": "ParallelGateway",
        "superClass": [ "Element" ],
        "meta": {
          "allowedIn": [
            "bpmn:ParallelGateway"
          ]
        },
        "properties": [
          {
            "name": "name",
            "type": "String",
            "isAttr": true,
            "default" : "分支"
          },
          { "name": "is_on_apply_fill", "type": "Boolean", "isAttr": true, "default" : false},
          { "name": "is_required", "type": "Boolean", "isAttr": true, "default" : true}
        ]
      }
  ]

}

export default qflowModdleDescriptor;