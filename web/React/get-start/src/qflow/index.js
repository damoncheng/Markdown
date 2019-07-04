import React from 'react';
import s from './style.scss';
import QflowModeler from './component/QflowBpmn/';

console.log(s.fontColor);

function QflowBpmn() {

    return (
      <div className={s.QflowBpmn}>
         {/*<span className={s.fontColor}>Hello Qflow 123</span>*/}
         <QflowModeler />
      </div>
    );
}
  
export default QflowBpmn;
