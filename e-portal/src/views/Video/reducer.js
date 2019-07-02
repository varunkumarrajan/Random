const initialState = {
  openModal: false,
  content: ""
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE":
      return {
        ...state,
        openModal: !state.openModal
      };
    case "OPEN":
      return {
        ...state,
        openModal: !state.openModal
      };
    case "GET_CONTENT":
      return {
        ...state,
        content: action.content
      };
    default:
      return state;
  }
};
export default videoReducer;
