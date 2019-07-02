const initialState = {
  studentModalState: false,
  teacherDetails: {},
  notificationData: {},
  notificationDetailsBasedOnStudent: [],
  keyForNotification: ''
};
const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        studentModalState: true,
        teacherDetails: action.value
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        studentModalState: false
      };

    case "GET_NOTIFICATION":
      return {
        ...state,
        notificationData: action.NotificationData
      };

    case "GET_NOTIFICATIONS_STUDENT_ID":
      return {
        ...state,
        notificationData: action.notificationsBasedOnStudent
      };

    case 'GO_BACK_TO_NOTIFICATION':
      return {
        ...state,
        keyForNotification: action.payload
      };

    default:
      return state;
  }
};
export default studentReducer;
