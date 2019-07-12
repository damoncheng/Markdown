export var START_EVENT = [

];

export var INTERMEDIATE_EVENT = [
 
];

export var END_EVENT = [
 
];

export var SUBPROCESS_EXPANDED = [
 
];

export var TRANSACTION = [

];

export var EVENT_SUB_PROCESS = [

];

export var TASK = [
  {
    label: '普通步骤(User Task)',
    actionName: 'replace-with-user-task',
    className: 'bpmn-icon-user',
    target: {
      type: 'bpmn:UserTask'
    }
  },
  {
    label: '工具步骤(Service Task)',
    actionName: 'replace-with-service-task',
    className: 'bpmn-icon-service',
    target: {
      type: 'bpmn:ServiceTask'
    }
  }

];


export var GATEWAY = TASK;


export var BOUNDARY_EVENT = [

];

export var EVENT_SUB_PROCESS_START_EVENT = [

];

export var SEQUENCE_FLOW = [

];

export var PARTICIPANT = [

];
