import React from 'react';

class Content extends React.Component {

    constructor(props) {

        super(props);
    
        this.state = {
            classname : "false"
        };
    
    }

    changeStateClass(classname){

        console.log("classname : ", classname);
        this.setState({classname : classname});
        console.log("this.state.classname : ", this.state.classname)


    }

    render() {
        return (
          <div className={this.state.classname}>
             <button onClick = {() => {this.changeStateClass("true")}} >
                Change ClassName!
             </button>
          </div>
        );
      }

}


function Condition() {

    return (
        <Content />
    );
}
  
export default Condition;
