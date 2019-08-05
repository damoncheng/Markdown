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

import { Loading, Message, Button, Dialog, Form, Input } from 'element-react';

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
        operate_dialog_object : {
          dialog_visible: false,
        },
        operate_dialog_object_form : {
          details : ""
        },
        show_pane : false,
        loading : true,
        
      };

      this.qflow_basic = {

        qflow_type : qflowType,

        start_overlay_id : undefined,

        //系统参数
        system_params : [],

        //小工具
        tools : {},


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

    getOverlayHtml(text, overlay_css){

      return `<div style="${overlay_css}">${text}</div>`

    }

    updateModelering(init=false) {

      let sync_active = false;
   
      if(!init)
        sync_active = true;

      this.modeler.saveSVG((err, svg) => {
        this.setEncoded({href : "download_svg_href", name : "download_svg_name", sync_active : sync_active}, 
        'diagram.svg', err ? null : svg);
      });

      //add overlays after import newDiagram
      let qflow_arith = this.modeler.get("qflow_arith");
      let start_shape = qflow_arith.check_start_shape_overlay();

      if(start_shape && !this.qflow_basic.start_overlay_id){

          let overlays = this.modeler.get("overlays");

          this.qflow_basic.start_overlay_id = overlays.add(start_shape, {
              position: {
                bottom: 0,
                right: 0
              },
              html: this.getOverlayHtml('点击我, 选择<span class="bpmn-icon-user"></span>, 开始创建一个步骤吧...', "min-width:100px;color:#FF7F50;")
            });

      }
      else if(this.qflow_basic.start_overlay_id && !start_shape){

         let overlays = this.modeler.get("overlays");

         overlays.remove(this.qflow_basic.start_overlay_id);

         this.qflow_basic.start_overlay_id = undefined;

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
  
        return this.handleShown(true);

      });

      this.modeler.on('commandStack.changed', debounce(() => {

          this.updateModelering();

        }, 500)

      );

      this.modeler.on('propertiesPanel.changed', (event) => {

        var element = event.current.element;

        if(this.props.DEBUG){

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
  
    fetchDiagram(url, init=true) {
  
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
        this.handleResponse(response_dict, init);
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
        this.handleResponse(response_dict, false, 'PUT');
      })
      .catch(err => {
        console.log("response_err : ", err);
        this.handleError(err, false);
      });

    }

    syncModeler(deployment=false){

      if(this.props.DEBUG)
      {
        console.log("syncModeler......")
        console.log(this.state)
      }

      this.modeler.saveXML({ format: true }, (err, xml) => {

        if(this.props.DEBUG){
          console.log("err : ", err);
        }

        let data = {

          "xml" : xml,
          "deployment" : deployment,
          "details" : this.state.operate_dialog_object_form.details

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
        },
        operate_dialog_object : {
          ...this.operate_dialog_object,
          dialog_visible: false 
        }
      });

      this.handleSuccess("同步模型成功")

    }

    handleResponse(response_dict, init=true, method='GET') {

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

        if(method == 'GET' && !init){

          this.handleSuccess("更新模型环境成功")

        }
        else if(method == 'PUT'){

          this.afterSyncModeler();

        }
      }
      else if("detail" in response_dict){

        err_message = response_dict["detail"];

      }
      else{

        err_message = "操作失败";

      }

      if(err_message){
   
        this.handleError(err_message, init);
      
      }

    }

    handleLoading() {
       this.setState({loading : true});
    }

    handleSuccess(msg){

      const { onSuccess } = this.props;

      onSuccess(msg);

      this.handleShown()

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

      this.handleShown()

    }
  
    handleShown(init=false) {

      this.setState({loading : false});

      if(init && this.state.modeler_class_object.with_diagram)
          this.updateModelering(init);
    
    }

    openDialog() {

      this.setState({
        operate_dialog_object : {
          ...this.state.operate_dialog_object,
          dialog_visible : true
        }
      });
    }

    onSubmit(e) {
      e.preventDefault();
    }
    
    onChange(key, value) {
      this.state.operate_dialog_object_form[key] = value;
      this.forceUpdate();
    }
  
    render() {

      var modeler_classes = classNames({
        'QflowBpmn' : true,
        'with-diagram' : this.state.modeler_class_object.with_diagram,
        'with-error' : this.state.modeler_class_object.with_error
      });
      
      if(this.props.DEBUG)
      {
        console.log("modeler_classes : ", modeler_classes);
        console.log(this.state.err_message)
      }

      return (
        <div id="QflowModeler" className={modeler_classes}>

          <Loading 
            className="loading"
            loading={this.state.loading}
            position="static"
            text="加载中..."
          >

            <div className="message error">
              <div className="note">
                <p>Ooops, 流程建模页面打开失败...</p>

                <div className="details">
                  <span>失败详情:</span>
                  <pre>{`${ this.state.err_message }`}</pre>
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
              openDialog={() => this.openDialog()}
              updateModelerEnv={() => this.fetchDiagram(this.props.url, false)}
              syncModeler = {(deployment) => this.syncModeler(deployment)}
            />

            <Dialog
              title="版本描述"
              size="tiny"
              visible={ this.state.operate_dialog_object.dialog_visible }
              onCancel={ () => this.setState({ operate_dialog_object : {
                  ...this.operate_dialog_object,
                  dialog_visible : false
              }}) }
              lockScroll={ false }
            >

              <Dialog.Body>
                  <Form model={this.state.operate_dialog_object_form} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label="描述信息">
                      <Input value={this.state.operate_dialog_object_form.details} onChange={this.onChange.bind(this, 'details')}></Input>
                    </Form.Item>
                  </Form>
              </Dialog.Body>

              <Dialog.Footer className="dialog-footer">
                <Button onClick={ () => this.setState({ 
                    operate_dialog_object : {
                      ...this.operate_dialog_object,
                      dialog_visible: false 
                    }
                  }) 
                }>
                  取消
                </Button>
                <Button type="primary" 
                  onClick={ 
                    () => 
                    {
                      this.syncModeler(true)
                      
                    }
                  }
                >
                  确定
                </Button>
              </Dialog.Footer>

            </Dialog>
              
          </Loading>

        </div>    
      );
    }

}

QflowBpmnModeler.defaultProps = {

    DEBUG : true,

    onSuccess : function onSuccess(msg){
        //console.log("success", msg);
        Message({
          message: msg,
          type: 'success'
        });
    },
    onError : function onError(err) {
        //console.error('failed to render diagram', err);
        Message.error(err);
    },

}

export default QflowBpmnModeler;

