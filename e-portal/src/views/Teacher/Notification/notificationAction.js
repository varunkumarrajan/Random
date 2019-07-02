import { getTeacherNotificationFromDB, getNotificationFromDB, getTeacherFromDB, getStudentFromDB, getTeacherFromStudentIdFromDB } from '../../../database/dal/firebase/chatNotificationDal';

export const getTeacherNotification = (uid) => {
    console.log("getTeacherNotification action page")
    return (dispatch) => {
        getTeacherNotificationFromDB(dispatch, uid);
    }
}

export const getNotification = (uid) => {
    console.log("getNotification action page")
    return (dispatch) => {
        getNotificationFromDB(dispatch, uid);
    }
}
export const getStudentNotification = (uid) => {
    console.log("getStudentNotification action page")
    return (dispatch) => {
        getTeacherFromStudentIdFromDB(dispatch, uid);
    }
}


export const getTeachers = (uid) => {
    console.log("getTeachers action page")
    return (dispatch) => {
        getTeacherFromDB(dispatch, uid);
    }
}

export const getStudents = (uid) => {
    console.log("getStudents action page")
    return (dispatch) => {
        getStudentFromDB(dispatch, uid);
    }
}


export const setKeyForNotificationPage = (notificationDetails) => {
    return { type: "GO_BACK_TO_NOTIFICATION", payload: notificationDetails };
}

