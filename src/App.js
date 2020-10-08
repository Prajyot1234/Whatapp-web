import React from 'react';
import './App.css';
import Appbodyleft from "./Appbodyleft";
import Appbodyright from "./Appbodyright";
import {BrowserRouter as Router , Switch , Route } from "react-router-dom";
import Login from "./Login";
import { useDataLayerValue } from './DataLayer';


function App() {

  const [ { user } , dispatch ] = useDataLayerValue();
  
  return user ? (
    <div className="App">
         <div className="App_body">
         
         {/* <Appbodyright /> */}
         <Router>
            <Switch>
               <Route path="/:roomid">
                  <Appbodyleft />
                  <Appbodyright />  
               </Route> 
               <Route path="/">
                  <Appbodyleft />
               </Route> 
            </Switch>
          </Router>   
       </div>
    </div>
      ) : (
          <Login />
       )
}
export default App;
