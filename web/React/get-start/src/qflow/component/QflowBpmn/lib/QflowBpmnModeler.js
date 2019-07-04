import React from 'react';

import BpmnJS from 'bpmn-js';
import Modeler from 'bpmn-js/lib/Modeler';
import OriginModule from 'diagram-js-origin';

import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/bpmn';

import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js-properties-panel/styles/properties.less';

import diagram from '../assets/diagram.bpmn';
import '../style/bpmn.less';

function onError(err) {
    console.error('failed to render diagram', err);
}

function onLoading() {
    console.log('loading diagram');
}

function onShown() {
    console.log('diagram shown');
}

class QflowBpmnModeler extends React.Component {

    constructor(props) {

      super(props);
  
      this.state = { };
  
      this.canvasRef = React.createRef();
      this.panelRef = React.createRef();

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

      console.log("preProps : ". prevProps);
      console.log("prevState : ", prevState);
      console.log("props : ", props);
      console.log("state : ", state);

      if (props.url !== prevProps.url) {
        return this.fetchDiagram(props.url);
      }

      if (state.diagramXML !== prevState.diagramXML) {
        return this.modeler.importXML(state.diagramXML);
      }

    }
  
    fetchDiagram(url) {
  
      this.handleLoading();
  
      /*
      fetch(url)
        .then(response => response.text())
        .then(text => this.setState({ diagramXML: text }))
        .catch(err => this.handleError(err));
      */

      //调试使用diagram文件
      this.setState({diagramXML : diagram});
      
    }

    handleLoading() {
      const { onLoading } = this.props;
  
      if (onLoading) {
        onLoading();
      }
    }
  
    handleError(err) {
      const { onError } = this.props;
  
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
      return (
        <div id="QflowModeler" className="with-diagram">
            <div ref={ this.canvasRef } className="canvas"></div>
            <div ref={ this.panelRef }  className="properties-panel-parent"></div>
            <div id="operate">
              <ul class="buttons">
                <li>
                  <a id="js-download-svg"  
                    title="下载svg图片"
                  >
                    下载模型svg
                  </a>
                </li>
              </ul>
            </div>
        </div>
      );
    }
}

function QflowModelerBpmn() {
    return (
        <QflowBpmnModeler
          url="/diagram.bpmn"
          onLoading={ onLoading }
          onShown={ onShown }
          onError={ onError }
        />
    );
}
  
export default QflowModelerBpmn;