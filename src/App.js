import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


import HomeScreen from "./screens/HomeScreen"
import ImpressumScreen from "./screens/ImpressumScreen"


import InfoScreen from "./screens/InfoScreen"
import LoginScreen from "./screens/LoginScreen"

//Firebase Auth
import {AuthProvider} from "./components/FirebaseAuth/Auth"
import PrivateRoute from "./components/FirebaseAuth/PrivateRoute"

//cookie consent
import CookieConsent from "./components/Cookies/CookieConsent"





function App() {

  
  
  
  return (
    <AuthProvider>
      <Router>
        <div className="App h-full text-xl">
          <Switch>
            <Route path="/info" component={InfoScreen}/>
              
            <Route path="/impressum" component={ImpressumScreen}/>
              
            <Route path="/login" component={LoginScreen}/>

            {/*<Route path="/signup" component={SignupScreen} />*/} 

            <PrivateRoute path="/" component={HomeScreen}/>
              
            
            
          </Switch>
          <CookieConsent/>
        </div>
      </Router>
      
    </AuthProvider>
  )
  

  
}

export default App;
