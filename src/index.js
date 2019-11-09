import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from './components/user';
import home from './components/home';
import Doctor from './components/doctor';
import Find from './components/findRecord';
import DocHome from './components/docHome';
import SubmitVac from './components/submitVac';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
const routing = (
    <div>
        <App/>
    <Router>
      <div>
      <Route path="/home" component={home} />
        <Route path="/user" component={Find} />
        <Route path="/registerUser" component={User} />
        <Route path="/doctor" component={DocHome} />
        <Route path="/submit" component={SubmitVac}/>
        <Route path="/doctorReg" component={Doctor}/>
      </div>
    </Router>
    </div>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
