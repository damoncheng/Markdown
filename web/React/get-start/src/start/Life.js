import React from 'react';

/**

    组件的生命周期可分成三个状态：

    Mounting：已插入真实 DOM
    Updating：正在被重新渲染
    Unmounting：已移出真实 DOM

*/

class Hello extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {opacity: 1.0};
    }
   
    componentDidMount() {
      this.timer = setInterval(function () {
        var opacity = this.state.opacity;
        opacity -= .05;
        if (opacity < 0.1) {
          opacity = 1.0;
        }
        this.setState({
          opacity: opacity
        });
      }.bind(this), 100);
    }
   
    render () {
      return (
        <div style={{opacity: this.state.opacity}}>
          Hello {this.props.name}
        </div>
      );
    }
}

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: 0};
        this.setNewNumber = this.setNewNumber.bind(this);
    }
    
    setNewNumber() {
      this.setState({data: this.state.data + 1})
    }
    render() {
        return (
           <div>
              <button onClick = {this.setNewNumber}>INCREMENT</button>
              <Content myNumber = {this.state.data}></Content>
           </div>
        );
      }
  }
   
   
  class Content extends React.Component {
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
         console.log('Component DID MOUNT!')
    }
    componentWillReceiveProps(newProps) {
          console.log('Component WILL RECEIVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
          return true;
    }
    componentWillUpdate(nextProps, nextState) {
          console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
          console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
           console.log('Component WILL UNMOUNT!')
    }
   
      render() {
        return (
          <div>
            <h3>{this.props.myNumber}</h3>
          </div>
        );
      }
  }

function Life() {
    return (
      <div className="Life">
        <Hello name="world"/>
        <Button />
      </div>
    );
}
  
export default Life;