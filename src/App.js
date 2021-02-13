import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import HomeScreen from "./screens/HomeScreen"
import ImpressumScreen from "./screens/ImpressumScreen"
import InfoScreen from "./screens/InfoScreen"


function App() {
  return (
    <Router>
      <div className="App h-full text-xl">
        <Switch>
          <Route path="/info">
            <InfoScreen/>
          </Route>
          <Route path="/impressum">
            <ImpressumScreen />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
