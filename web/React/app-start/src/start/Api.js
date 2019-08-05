import React from 'react';

class Counter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {clickCount: 0};
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
      this.setState(function(state) {
        return {clickCount: state.clickCount + 1};
      });
    }
    render () {
      return (<h2 onClick={this.handleClick}>点我！点击次数为: {this.state.clickCount}</h2>);
    }
}

function API() {
    return (
      <div className="API">
        <Counter />,
      </div>
    );
  }
  
  export default API;