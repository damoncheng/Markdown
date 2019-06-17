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

  function createParticipant(event, collapsed) {
    create.start(event, elementFactory.createParticipantShape(collapsed));
  }

  assign(actions, {

    'hand-tool': {
      group: 'tools',
      className: 'bpmn-icon-hand-tool',
      title: translate('激活hand tool'),
      action: {
        click: function(event) {
          handTool.activateHand(event);
        }
      }
    },
    'create.hand-tool-text': {
      group: 'tools',
      html: '<span class="entry-text" style="font-size:8px;display:block">拖动工具</span>'
    },
    'lasso-tool': {
      group: 'tools',
      className: 'bpmn-icon-lasso-tool',
      title: translate('激活lasso tool'),
      action: {
        click: function(event) {
          lassoTool.activateSelection(event);
        }
      }
    },
    'create.lasso-tool-text': {
      group: 'tools',
      html: '<span class="entry-text" style="font-size:8px;display:block">多选工具</span>'
    },
    'global-connect-tool': {
      group: 'tools',
      className: 'bpmn-icon-connection-multi',
      title: translate('创建连接'),
      action: {
        click: function(event) {
          globalConnect.toggle(event);
        }
      }
    },
    'tool-separator': {
      group: 'tools',
      separator: true
    },
    
    'create.start-event': createAction(
      'bpmn:StartEvent', 
      'event', 
      'bpmn-icon-start-event-none', 
      '创建开始事件'
    ),
   
 
    'create.task-user': createAction(
      'bpmn:UserTask', 'activity', 'bpmn-icon-user', '创建步骤'
    ),
    'create.start-event-text': {
      group: 'activity',
      html: '<span class="entry-text" style="font-size:8px;display:block">创建步骤</span>'
    },
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
