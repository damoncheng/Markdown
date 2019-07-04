import React from 'react';
import { tsPropertySignature } from '@babel/types';


//JSX 元素渲染
const element = <h1>Hello, React element!</h1>;

function Welcome(props) {
  return <h2>hello {props.welcome}.</h2>;
}

function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
 
  return (
    <div className="warning">
      警告!
    </div>
  );
}

/*

  组件
  State
  props
  事件处理

*/
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      welcome : "React Component!",
      name : "Hello World!",
      showWarning: true
    };

    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    //this.activateLasers = this.activateLasers.bind(this);

  }
 
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
 
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
 
  tick() {
    this.setState({
      date: new Date()
    });
  }

  /*
  activateLasers(e) {

    //在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为， 你必须明确的使用 preventDefault。
    e.preventDefault();
    console.log("this.welcome : ", this.state.welcome);

  }
  */

  preventPop(name, e){    //事件对象e要放在最后
    e.preventDefault();
    alert(name);
  }


  activateLasers = (e) => {
    console.log('this is:', this);
  }
  
 
  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <h2>{this.props.defaultProps}</h2>
        <Welcome welcome={this.state.welcome} />
        <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
        <button onClick={this.activateLasers}>
          激活按钮
        </button>
        <a href="https://reactjs.org" onClick={this.preventPop.bind(this,this.state.name)}>Click</a>
      </div>
    );
  }
}

Clock.defaultProps = {

  defaultProps : 'Hello, defaultProps'

}

//条件渲染
function UserGreeting(props) {
  return <h1>欢迎回来!</h1>;
}

function GuestGreeting(props) {
  return <h1>请先注册。</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LogoutButton(props) {

  return <button onClick={props.onClick}>Logout</button>

}

function LoginButton(props) {

  return <button onClick={props.onClick}>Login</button>

}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }
 
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
 
  handleLogoutClick() {
    console.log("logoutClick...")
    this.setState({isLoggedIn: false});
  }
 
  render() {
    const isLoggedIn = this.state.isLoggedIn;
 
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
 
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          您有 {unreadMessages.length} 条未读信息。
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];

//列表
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((numbers) =>
  <li>{numbers}</li>
);


function Render() {
  return (
    <div className="Render">
       <input value="123"/>
       {element}
       <Clock  />
       <LoginControl />
       <Mailbox unreadMessages={messages} />
       <ul>{listItems}</ul>,
    </div>
  );
}

export default Render;