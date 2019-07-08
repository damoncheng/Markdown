import React from 'react';
import classNames from 'classnames';

import BpmnJS from 'bpmn-js';
import Modeler from 'bpmn-js/lib/Modeler';
import OriginModule from 'diagram-js-origin';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/bpmn';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js-properties-panel/styles/properties.less';

import qflowType from './customType/QflowType'
import newDiagram from '../assets/newDiagram.bpmn';
import '../style/bpmn.less';

class QflowBpmnModeler extends React.Component {

    constructor(props) {

      super(props);
  
      this.state = {

        err_message : '',
        modeler_class_object : {
          with_diagram : true,
          with_error : false
        },
        qflow_basic : {

          qflow_type : qflowType,

          start_overlay_id : undefined,
  
          //系统参数
          //system_params : [],
  
          //小工具
          //tools : {},
  
          //字段值初始化工具
          //init_value_tools : {},
  
          //选项初始化工具 
          //init_option_tools : {},
  
          //产品相关角色配置
          //roduct_roles : {},
  
          //流程相关子流程
          //sub_flows : {},
  
          //流程推送模版
          //push_templates : {},
  
          //user信息
          //users : []
  
        }
        
      };

      this.canvasRef = React.createRef();
      this.panelRef = React.createRef();

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
  
      this.modeler = new Modeler({

        container : canvas, 

        propertiesPanel: {
            parent: panel
        },

        additionalModules : [

            OriginModule,
            propertiesPanelModule,
            propertiesProviderModule

        ]

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

      return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      })
      .then(response => {
        console.log("putDiagram response : ", response)
        response.json()}
      ) // parses response to JSON

    }

    syncModeler(deployment=false){

      console.log("syncModeler......")
      // this.setState({
      //   sync_time : this.getDatetime()
      // });

      this.modeler.saveXML({ format: true }, (err, xml) => {

        if(this.DEBUG){
          console.log("err : ", err);
        }

        let data = {

          "name" : "coding_test",
          "xml" : xml,
          //"deployment" : deployment

        };

        this.putDiagram(this.props.url, data)
        .then(data => {
          console.log("putDiagram response json : ", data);
          this.setState({
            sync_time : this.getDatetime()
          });
        }) 
        .catch(error => {
          console.error(error);
        });

      });


    }

    handleResponse(response_dict) {

      console.log("handleResponse......")
      console.log("response_dict : ", response_dict);

      if("xml" in response_dict){

        var xml = response_dict["xml"];

        if(xml){

          this.setState({ diagramXML: xml });

        }
        else{

          this.setState({ diagramXML: newDiagram });

        }
      }
      else if("detail" in response_dict){

        this.handleError(response_dict["detail"]);

      }
      else{

        this.handleError("Unknown Error");

      }


    }

    handleLoading() {
      const { onLoading } = this.props;
  
      if (onLoading) {
        onLoading();
      }
    }
  
    handleError(err) {
      const { onError } = this.props;
  
      this.setState({
        err_message : err,
        modeler_class_object : {
          with_diagram : false,
          with_error : true
        },
        sync_time : '-'
      });

      if (onError) {
        onError(err);
      }
    }
  
    handleShown(warnings) {
      const { onShown } = this.props;
  
      if (onShown) {
        onShown(warnings);
      }
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
            <div ref={ this.canvasRef } className="canvas"></div>
            <div ref={ this.panelRef }  className="properties-panel-parent"></div>
            <div id="operate">
              <ul className="buttons">
                <li>
                  <a id="js-download-svg">
                    下载模型svg
                  </a>
                </li>
                <li>
                  <span>|</span>
                </li>
                <li>
                  <a 
                    //:class="{active : update_env_active}"
                    //v-on:click = "updateModelerEnv()"
                  >
                    更新模型环境
                  </a>
                </li>
                <li>
                  <span>|</span>
                </li>
                <li>
                  <a 
                    //:class="{active : deployment_active}"
                    //v-on:click = "deployment_visible=true"
                  >
                    保存并启用
                  </a>
                </li>
                <li>
                  <span>|</span>
                </li>
                <li>
                  <a 
                    //:class="{active : sync_active}"
                    onClick = { () => this.syncModeler(false) }
                  >
                    保存草稿
                  </a>
                </li>
                <li>
                    保存时间:<span>{this.state.sync_time}</span>
                </li>
                </ul>
            </div>
        </div>
      );
    }

}

QflowBpmnModeler.defaultProps = {

    DEBUG : true,

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

