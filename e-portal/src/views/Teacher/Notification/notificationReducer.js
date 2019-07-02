const initialState = {
    notificationDetails: {},
    keyForNotification: ''
};
const notificationReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_NOTIFICATIONS':
            console.log("Notification Action Type ", action.type)
            return {
                ...state,
                notificationDetails: action.notifications
            };


        case 'GET_TEACHER_NOTIFICATIONS':
            console.log("Teacher Notification Action Type ", action.type)
            return {
                ...state,
                notificationDetails: action.notifications
            };

        case 'GET_STUDENT_NOTIFICATIONS':
            console.log("Student Notification Action Type ", action.type)
            return {
                ...state,
                notificationDetails: action.notifications
            };

        case 'GET_TEACHERS':
            console.log("GET_TEACHERS Action Type ", action.type)
            return {
                ...state,
                teacherDetails: action.Teachers
            };

        case 'GET_STUDENTS':
            console.log("GET_STUDENTS Action Type ", action.type)
            return {
                ...state,
                studentDetails: action.Students
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
export default notificationReducer;
