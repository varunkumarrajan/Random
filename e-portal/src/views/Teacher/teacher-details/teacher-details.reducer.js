const initialState = {
    requestForReviewPop: false,
  };
  const teacherDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'OPEN_MODAL':
        return {
          ...state,
          requestForReviewPop : true
        };
      case 'CLOSE_MODAL':
        return {
          ...state,
          requestForReviewPop : false
        };
  
      default:
        return state;
    }
  };
  export default teacherDetailsReducer;
  