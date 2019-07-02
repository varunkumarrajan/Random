const initialState = {
    getSelectedSubj : ''
  };
  const categoryReducerForSubject = (state = initialState, action) => {
    switch (action.type) {
      case 'SEND_SELECTED_SUBJECT':
        return { ...state , 
            getSelectedSubj : action.value
        };
      default:
        return state;
    }
  };
  export default categoryReducerForSubject;
  