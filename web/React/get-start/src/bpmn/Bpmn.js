import React from 'react';

import BpmnJS from 'bpmn-js/dist/bpmn-navigated-viewer.production.min.js';
import diagram from './diagram.bpmn';

function onError(err) {
  console.error('failed to render diagram', err);
}
function onLoading() {
  console.log('loading diagram');
}
function onShown() {
  console.log('diagram shown');
}

class ReactBpmn extends React.Component {

    constructor(props) {

      super(props);
  
      this.state = { };
  
      this.containerRef = React.createRef();
    }
  
    componentDidMount() {
      
      const {
        url
      } = this.props;
  
      const container = this.containerRef.current;
  
      this.bpmnViewer = new BpmnJS({ container });
  
      this.bpmnViewer.on('import.done', (event) => {
        const {
          error,
          warnings
        } = event;
  
        if (error) {
          return this.handleError(error);
        }
  
        this.bpmnViewer.get('canvas').zoom('fit-viewport');
  
        return this.handleShown(warnings);
      });
  
      this.fetchDiagram(url);

    }
  
    componentWillUnmount() {
      this.bpmnViewer.destroy();
    }
  
    componentDidUpdate(prevProps, prevState) {
      const {
        props,
        state
      } = this;
  
      if (props.url !== prevProps.url) {
        return this.fetchDiagram(props.url);
      }

      console.log("diagramXML : ", state.diagramXML)
  
      if (state.diagramXML !== prevState.diagramXML) {
        return this.bpmnViewer.importXML(state.diagramXML);
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
        <div className="react-bpmn-diagram-container" 
             ref={ this.containerRef }
             style={{height : 500 + 'px'}}
        >
        </div>
      );
    }
}

function Bpmn() {
    return (
      <div className="Bpmn">
        <ReactBpmn
          url="/diagram.bpmn"
          onLoading={ onLoading }
          onShown={ onShown }
          onError={ onError }
        />
      </div>
    );
}
  
export default Bpmn;