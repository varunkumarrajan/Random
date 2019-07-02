const initialState = {
  teacherDetails: [],
  jsonp: '',
  getTeacherList: '',
};
const searchTeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TEACHERS':
      return {
        ...state,
        teacherDetails: action.Teachers
      };
    case 'get_jsonp':
      return {
        ...state,
        jsonp: action.jsonp
      }
    case 'SET':
      return {
        ...state,
        getTeacherList: action.res
      }

    default:
      return state;
  }
};
export default searchTeacherReducer;
