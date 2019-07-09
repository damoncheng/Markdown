import {
    assign
} from 'min-dash';
  
  
/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */
export default function PaletteProvider(palette, create, elementFactory,
  spaceTool, lassoTool, handTool,
  globalConnect, translate) {

  this._palette = palette;
  this._create = create;
  this._elementFactory = elementFactory;
  this._spaceTool = spaceTool;
  this._lassoTool = lassoTool;
  this._handTool = handTool;
  this._globalConnect = globalConnect;
  this._translate = translate;

  palette.registerProvider(this);
}

PaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'spaceTool',
  'lassoTool',
  'handTool',
  'globalConnect',
  'translate'
];


PaletteProvider.prototype.getPaletteEntries = function(element) {

  var actions  = {},
      create = this._create,
      elementFactory = this._elementFactory,
      spaceTool = this._spaceTool,
      lassoTool = this._lassoTool,
      globalConnect = this._globalConnect,
      translate = this._translate;


  function createAction(type, group, className, title, options) {

    function createListener(event) {
      var shape = elementFactory.createShape(assign({ type: type }, options));

      if (options) {
        shape.businessObject.di.isExpanded = options.isExpanded;
      }

      create.start(event, shape);
    }

    var shortType = type.replace(/^bpmn:/, '');

    return {
      group: group,
      className: className,
      title: title || 'Create ' + shortType,
      action: {
        dragstart: createListener,
        click: createListener
      }
    };
  }

  function createText(group, text){

    return {

      group : group,
      html : `<span class="entry-text">${text}</span>`

    }

  }

  function createParticipant(event, collapsed) {
    create.start(event, elementFactory.createParticipantShape(collapsed));
  }

  assign(actions, {

    'hand-tool': {
      group: 'tools',
      className: 'bpmn-icon-hand-tool',
      //title: translate('激活hand tool'),
      title: translate('选中后，可通过鼠标拖动建模面板，调整流程编辑视角'),
      action: {
        click: function(event) {
          handTool.activateHand(event);
        }
      }
    },
    'hand-tool-text': createText('tools', "拖动工具"),
    'lasso-tool': {
      group: 'tools',
      className: 'bpmn-icon-lasso-tool',
      //title: translate('激活lasso tool'),
      title: translate('可通过鼠标，选择区域内所有元素，批量调整元素'),
      action: {
        click: function(event) {
          lassoTool.activateSelection(event);
        }
      }
    },
    'lasso-tool-text': createText('tools', "多选工具"),
    'global-connect-tool': {
      group: 'tools',
      className: 'bpmn-icon-connection-multi',
      title: translate('为建模面板内任意两个步骤元素，创建连接关系'),
      action: {
        click: function(event) {
          globalConnect.toggle(event);
        }
      }
    },
    'global-connect-tool-text': createText('tools', "创建连接"),
    'tool-separator': {
      group: 'tools',
      separator: true
    },
    /*
    'create.start-event': createAction(
      'bpmn:StartEvent', 'event', 'bpmn-icon-start-event-none', '创建开始事件'
    ),
    */
    /*
    'create.end-event': createAction(
      'bpmn:EndEvent', 'event', 'bpmn-icon-end-event-none', '创建结束事件'
    ),
    */
    'create.task-user': createAction(
      'bpmn:UserTask', 'activity', 'bpmn-icon-user', '在建模面板内创建一个普通步骤'
    ),
    'create.task-user-text': createText('activity', "创建步骤"),
    /*
    'create.parallel-gateway': createAction(
      'bpmn:ParallelGateway', 'gateway', 'bpmn-icon-gateway-parallel', '创建分支步骤',
    ),
    'create.subprocess-collapsed': createAction(
      'bpmn:SubProcess', 'activity', 'bpmn-icon-subprocess-collapsed', '创建子流程步骤',
      { isExpanded: false }
    ),
    */
  });

  return actions;
}
