import React from 'react';
import s from './style.scss';
import QflowBpmnModeler from './component/QflowBpmn/';

function onError(err) {
  console.error('failed to render diagram', err);
}

function onLoading() {
  console.log('loading diagram');
}

function onShown() {
  console.log('diagram shown');
}

function QflowBpmn() {

    return (
      <div className={s.QflowBpmn}>
         {/*<span className={s.fontColor}>Hello Qflow 123</span>*/}
         <QflowBpmnModeler 
            url="/api/user/1/project/1/qflow/flows/2/modeler"
            //onError={ onError }
            //onSucess={ onSuccess }
         />
      </div>
    );
}
  
export default QflowBpmn;

