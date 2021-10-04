import React, { useState } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import './App.css';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import CreatePackage from './components/CreatePackage/CreatePackage';
import useToken from './components/App/useToken';
import EditPackage from './components/EditPackage/EditPackage';

/*function setToken(userToken) {
  console.log("user token is:" + JSON.stringify(userToken));
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}*/

function App() {

  const {token, setToken} = useToken();
  const [userData, setUserData] = useState();

  console.log("stored token is: " + token);

  if(!token)
  {
    return <Login setToken = {setToken} setUserData = {setUserData}/>
  }
  return (
    <Router>
      <Switch>
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
      </Switch>
    </Router>
  );
}

export default App;
