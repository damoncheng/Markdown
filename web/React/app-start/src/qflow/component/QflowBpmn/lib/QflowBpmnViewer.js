import React from 'react';
import classNames from 'classnames';

import BpmnJS from 'bpmn-js/lib/NavigatedViewer'
import OriginModule from 'diagram-js-origin';

import '../style/bpmn.less';

import { Loading} from 'element-react';

class QflowBpmnViewer extends React.Component {

    constructor(props) {

      super(props);
  
      this.state = {

        err_message : '',
        modeler_class_object : {
          with_diagram : true,
          with_error : false
        },
        loading : true,
        
      };

      this.canvasRef = React.createRef();

    }

    componentDidMount() {
      
      const {
        url
      } = this.props;
  
      const canvas = this.canvasRef.current;

      this.viewer = new BpmnJS({

        container : canvas, 

        additionalModules: [

            OriginModule,
          
        ]

      });

      this.viewer.on('import.done', (event) => {
        const {
          error,
          warnings
        } = event;
  
        if (error) {
          return this.handleError(error);
        }

        var canvas = this.viewer.get('canvas');
            canvas.zoom('fit-viewport');
  
        return this.handleShown();

      });
  
      this.fetchDiagram(url);

    }
  
    componentWillUnmount() {
      this.viewer.destroy();
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
        return this.viewer.importXML(state.diagramXML);
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

    handleResponse(response_dict) {

      console.log("handleResponse......")
      console.log("response_dict : ", response_dict);

      var err_message = "";

      if("xml" in response_dict){

        var xml = response_dict["xml"];

        if(xml)
          this.setState({ diagramXML: xml });
        else
        err_message = "模型为空,加载失败"

      }
      else if("detail" in response_dict){

        err_message = response_dict["detail"];

      }
      else{

        err_message = "操作失败";

      }

      if(err_message){
   
        this.handleError(err_message);
      
      }

    }

    handleLoading() {
       this.setState({loading : true});
    }

  
    handleError(err) {
  
        this.setState({
          err_message : err,
          modeler_class_object : {
            with_diagram : false,
            with_error : true
          }
        });
      
      this.handleShown()

    }
  
    handleShown() {

      this.setState({loading : false});

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
        <div id="QflowViewer" className={modeler_classes}>

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
          </Loading>

        </div>    
      );
    }

}

QflowBpmnViewer.defaultProps = {

    DEBUG : true
}

export default QflowBpmnViewer;

