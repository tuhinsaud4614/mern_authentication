import * as actions from "../authAction/types";
import isEmpty from '../../validation/isEmpty';
const initialState = {
  isAuthenticated: false,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
