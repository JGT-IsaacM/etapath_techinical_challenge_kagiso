import React, { useState } from 'react';
import { BrowserRouter as Router, Route,Switch, Redirect } from 'react-router-dom';

import './App.css';

import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

import Home from './components/Home/Home';
import CreatePackage from './components/CreatePackage/CreatePackage';
import useToken from './components/App/useToken';
import EditPackage from './components/EditPackage/EditPackage';

function App() {

  const {token, setToken, destroyToken} = useToken();
  const [userData, setUserData] = useState();

  if(!token)
  {
    return <Login setToken = {setToken} setUserData = {setUserData}/>
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path = "/home">
          <Home 
            token = {token}
            userData = {userData}
          />
        </Route>
        <Route path = "/createPackage">
          <CreatePackage 
            token = {token}
            userData = {userData}
          />
        </Route>
        <Route path = "/editPackage">
          <EditPackage 
            token = {token}
            userData = {userData}
          />
        </Route>
        <Route path = "/logout">
          <Logout 
            token = {token}
            destroyToken = {destroyToken}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
