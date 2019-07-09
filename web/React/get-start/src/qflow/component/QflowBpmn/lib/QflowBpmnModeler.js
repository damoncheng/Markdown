import React from 'react';
import classNames from 'classnames';

import {
  debounce
} from 'min-dash';

import BpmnJS from 'bpmn-js';
import Modeler from 'bpmn-js/lib/Modeler';
import OriginModule from 'diagram-js-origin';

import propertiesPanelModule from 'bpmn-js-properties-panel';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js-properties-panel/styles/properties.less';

import newDiagram from '../assets/newDiagram.bpmn';
import '../style/bpmn.less';

import customModule from './custom';

import propertiesProviderModule from './customPanel';
import qflowArithModule from './customArith';
import qflowRenderModule from './customRender';
import qflowModdleDescriptor from './customDescriptors/qflow.js';

import qflowType from './customType/QflowType'

import QflowOperate from './customOperate/qflowOperate';

const showPropertiesPanel = require('./customPanel/Utils').showPropertiesPanel;

class QflowBpmnModeler extends React.Component {

    constructor(props) {

      super(props);
  
      this.state = {

        err_message : '',
        modeler_class_object : {
          with_diagram : true,
          with_error : false
        },
        modeler_active_object : {
          sync_active : false,
          download_active : false,
          download_svg_href : null,
          download_svg_name : 'diagram.bpmn',
        },
        show_pane : false
        
      };

      this.qflow_basic = {

        qflow_type : qflowType,

        start_overlay_id : undefined,

        //系统参数
        system_params : [],

        //小工具
        tools : {},

        //字段值初始化工具
        //init_value_tools : {},

        //选项初始化工具 
        //init_option_tools : {},

        //产品相关角色配置
        //product_roles : {},

        //流程相关子流程
        //sub_flows : {},

        //流程推送模版
        //push_templates : {},

        //user信息
        //users : []

      };

      this.canvasRef = React.createRef();
      this.panelRef = React.createRef();

    }

    setEncoded(obj, name, data) {

      var encodedData = encodeURIComponent(data);

      if (data) {

        var sync_active = false;
        
        if(obj.sync_active)
        {
          sync_active = true;
        }

        this.setState({
          modeler_active_object : {
            ...this.state.modeler_active_object,
            sync_active : sync_active,
            download_active : true,
            [obj.href] : 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
            [obj.name] : name
          }
        });

      } else {
        
        this.setState({
          modeler_active_object : {
            ...this.state.modeler_active_object,
            download_active : true,
            sync_active : false
          }
        });

      }

    }

    getDatetime() {

      var currentdate = new Date(); 
      var datetime = currentdate.getFullYear() +  "/" 
                    + (currentdate.getMonth()+1)  + "/"  
                    + currentdate.getDate() + " " 
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();

      return datetime;

    }
  
    componentDidMount() {
      
      const {
        url
      } = this.props;
  
      const canvas = this.canvasRef.current;
      const panel = this.panelRef.current;

      var component = this;
  
      this.modeler = new Modeler({

        container : canvas, 

        keyboard: {
          bindTo: document
        },

        propertiesPanel: {
            parent: panel
        },

        additionalModules : [

            OriginModule,
            //minimapModule,
            propertiesPanelModule,
            propertiesProviderModule,
            qflowArithModule,
            qflowRenderModule,
            {
              qflow_modeler: [ 'value', component ],
            }

        ],

        moddleExtensions: {
          qflow: qflowModdleDescriptor
        },

        modules: [].concat(
          Modeler.prototype._modules,
          [customModule] 
        )

      });

      this.modeler.on('import.done', (event) => {
        const {
          error,
          warnings
        } = event;
  
        if (error) {
          return this.handleError(error);
        }
  
        return this.handleShown(warnings);

      });

      this.modeler.on('commandStack.changed', debounce(() => {

          this.modeler.saveSVG((err, svg) => {
              this.setEncoded({href : "download_svg_href", name : "download_svg_name", sync_active : true}, 
              'diagram.svg', err ? null : svg);
          });
          //component.updateOverlay();

        }, 500)

      );

      this.modeler.on('propertiesPanel.changed', (event) => {

        var element = event.current.element;

        if(this.props.debug){

          console.log("event...", event);
          console.log("propertiesPanel.changed...", element);

        }

        // the element was changed by the user
        if (showPropertiesPanel(element)) {
            this.setState({
              show_panel : true
            });
        }
        else{
            this.setState({
              show_panel : false
            });
        }
        

      });
  
      this.fetchDiagram(url);

    }
  
    componentWillUnmount() {
      this.modeler.destroy();
    }
  
    componentDidUpdate(prevProps, prevState) {

      console.log("componentDidUpdate...");

      const {
        props,
        state
      } = this;

      if(props.DEBUG)
      {
        console.log("preProps : ". prevProps);
        console.log("prevState : ", prevState);
        console.log("props : ", props);
        console.log("state : ", state);
      }

      if (props.url !== prevProps.url) {
        return this.fetchDiagram(props.url);
      }

      if (state.diagramXML !== prevState.diagramXML) {
        return this.modeler.importXML(state.diagramXML);
      }

    }
  
    fetchDiagram(url) {
  
      this.handleLoading();
  
      fetch(url,{
          headers: {
            'Content-Type': 'application/json'
          },
      })
      .then(function(response) {
        console.log("response : ", response);
        return response.json();
      })
      .then(response_dict => {
        console.log("response_dict : ", response_dict);
        this.handleResponse(response_dict);
      })
      .catch(err => {
        console.log("response_err : ", err);
        this.handleError(err);
      });
      
    }

    putDiagram(url, data) {

      fetch(url, {
          body: JSON.stringify(data), // must match 'Content-Type' header
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      })
      .then(response => {

          console.log("putDiagram response : ", response)
          return response.json()
      
        }
      )
      .then(response_dict => {
        console.log("response_dict : ", response_dict);
        this.handleResponse(response_dict, false);
      })
      .catch(err => {
        console.log("response_err : ", err);
        this.handleError(err, false);
      });

    }

    syncModeler(deployment=false){

      console.log("syncModeler......")

      this.modeler.saveXML({ format: true }, (err, xml) => {

        if(this.props.DEBUG){
          console.log("err : ", err);
        }

        let data = {

          "xml" : xml,
          "deployment" : deployment

        };

        this.putDiagram(this.props.url, data)
     
      });


    }

    afterSyncModeler(){

      this.setState({
        modeler_active_object : {
          ...this.state.modeler_active_object,
          sync_active : false,
          sync_time : this.getDatetime()
        }
      });

      this.handleSuccess("同步模型成功")

    }

    handleResponse(response_dict, init=true) {

      console.log("handleResponse......")
      console.log("response_dict : ", response_dict);

      var err_message = "";

      if("xml" in response_dict){

        var xml = response_dict["xml"];

        if(init){

          if(xml)
            this.setState({ diagramXML: xml });
          else
            this.setState({ diagramXML: newDiagram });

        }
        else{

          this.afterSyncModeler();

        }
      }
      else if("detail" in response_dict){

        err_message = response_dict["detail"];

      }
      else{

        err_message = "Unknown Error";

      }

      if(err_message){
   
        handleError(err_message, init);
      
      }

    }

    handleLoading() {
      const { onLoading } = this.props;
  
      if (onLoading) {
        onLoading();
      }
    }

    handleSuccess(msg){

      const { onSuccess } = this.props;

      onSuccess(msg);

    }
  
    handleError(err, init=true) {
      const { onError } = this.props;
  
      if(init){
        this.setState({
          err_message : err,
          modeler_class_object : {
            with_diagram : false,
            with_error : true
          }
        });
      }
      else{
        onError(err);
      }

    }
  
    handleShown(warnings) {
      const { onShown } = this.props;
      onShown(warnings);
    }
  
    render() {

      var modeler_classes = classNames({
        'with-diagram' : this.state.modeler_class_object.with_diagram,
        'with-error' : this.state.modeler_class_object.with_error
      });
      
      if(this.props.DEBUG)
        console.log("modeler_classes : ", modeler_classes);

      return (
        <div id="QflowModeler" className={modeler_classes}>

            <div className="message error">
              <div className="note">
                <p>Ooops, 流程建模页面打开失败...</p>

                <div className="details">
                  <span>失败详情:</span>
                  <pre>{ this.state.err_message }</pre>
                </div>
              </div>
            </div>
            <div 
              ref={ this.canvasRef } 
              className="canvas"
            >
            </div>
            <div 
              ref={ this.panelRef }  
              className={`properties-panel-parent ${this.state.show_panel ? 'active' : ''}`}
            >
            </div>
            <QflowOperate 
              modeler_active_object={this.state.modeler_active_object} 
              syncModeler = {(deployment) => this.syncModeler(deployment)}
            />
        </div>    
      );
    }

}

QflowBpmnModeler.defaultProps = {

    DEBUG : true,

    onSuccess : function onSuccess(msg){
        console.log("success", msg);
    },
    onError : function onError(err) {
        console.error('failed to render diagram', err);
    },

    onLoading : function onLoading() {
        console.log('loading diagram');
    },

    onShown : function onShown() {
        console.log('diagram shown');
    }

}

export default QflowBpmnModeler;

