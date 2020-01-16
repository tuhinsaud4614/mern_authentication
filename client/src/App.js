import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser, logoutUser} from "../src/store/authAction/authAction";

import Navbar from "./componets/layouts/Navbar";
import Footer from "./componets/layouts/Footer";
import Landing from "./componets/layouts/Landing";
import Login from "./componets/auth/Login";
import DashBoard from "./componets/DashBoard";
import Register from "./componets/auth/Register";
import "./App.css";

//check for token
if(localStorage.jwtToken){
  // setAuthToken header
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const currentTime = Date.now() / 1000;
  console.log(decoded.exp);
  if(decoded.exp < currentTime) {
    // logout.user 
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/dashboard" component={DashBoard}></Route>
            <Route path="/" component={Landing}></Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
