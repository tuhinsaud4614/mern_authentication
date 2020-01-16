import * as actions from "../authAction/types";
const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
