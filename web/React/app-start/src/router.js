import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App.js';
import Bpmn from './bpmn/Bpmn.js';
import Element from './element/Element.js';
import {QflowModeler, QflowViewer} from './Qflow';
import Condition from './test/condition.js';


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/bpmn" component={Bpmn}/>
            <Route exact path="/Element" component={Element}/>
            <Route exact path="/qflow/modeler" component={QflowModeler}/>
            <Route exact path="/qflow/viewer" component={QflowViewer}/>
            <Route exact path="/test/condition" component={Condition}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;