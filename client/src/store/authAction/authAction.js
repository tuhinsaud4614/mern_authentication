import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actions from "./types";
import setAuthToken from "../../utils/setAuthToken";

export const registerUser = (userData, history) => {
  return dispatch => {
    axios
      .post("/api/users/register", userData)
      .then(res => history.push("/login"))
      .catch(err => {
        dispatch({
          type: actions.GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const loginUser = (userData) => {
  return dispatch => {
    axios
      .post("/api/users/login", userData)
      .then(res => {
        const {token} = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => {
        dispatch({
          type: actions.GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};

export const setCurrentUser = decoded => {
  return {
    type: actions.SET_CURRENT_USER,
    payload: decoded
  }
}

// log user out
export const logoutUser = () => dispatch => {
  // remove token from localStorage
  localStorage.removeItem('jwtToken');
  // remove auth header for future requests
  setAuthToken(false);
  // set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}
