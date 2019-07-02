const initialState = {
  openModalForStudent: false,
  taggedStudents: [], 
  notifications : []
};
const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CLOSE_MODAL':
      return { ...state , 
        openModalForStudent : false
      };

      case 'GET_NOTIFICATIONS':
      return { ...state , 
        notifications : action.notifications
      };
    default:
      return state;
  }
};
export default modalReducer;
