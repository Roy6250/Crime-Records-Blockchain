import React, { Component } from "react";

import {Router, Route, browserHistory, Redirect} from "react-router";

import Home from './Components/Home'
import PoliceHome from './Components/PoliceHome';
import NewFIR from './Components/NewFIR';
import ViewCase from './Components/ViewCase';
import Forensics from './Components/CrimeDetails/Forensics'
import ForensicsHome from './Components/ForensicHome'
import ForensicUpdate from './Components/ViewForensic.js'

import "./App.css";

class App extends Component {
  

  render() {
      return (
        <Router history={browserHistory}>   
            <Redirect from="/" to="/home" />
            <Route> 
              <Route path = "police" component = {PoliceHome}/>
              <Route path = "newfir" component = {NewFIR}/>
              <Route path = "viewcase/:caseId" component = {ViewCase}/>
              <Route path = "home" component = {Home}></Route>
              <Route path = "forensichome" component = {ForensicsHome}></Route>
              <Route path = "crimedata/forensics/:caseId/" component = {Forensics}/>   
              <Route path = "forensicUpdate/:caseId" component = {ForensicUpdate}></Route>  
               
            </Route>                 
        </Router>
    );
  }
}
export default App;
