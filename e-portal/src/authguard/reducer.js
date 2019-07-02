import * as actionTypes from "./actions";
const initialState = {
  authenticationStatus: false
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_STATUS:
      return {
        ...state,
        authenticationStatus: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default authenticationReducer;
