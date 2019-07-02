import {
  getTeacherFromDB,
  getCurriculumFromDB
} from "../../database/dal/firebase/homeDal";

// import {getNotificationFromDB} from '../../database/dal/firebase/studentDal';

import {
  getNotificationForStudentBasedFromDB,
  getNotificationFromDB
} from "../../database/dal/firebase/notificationdal";
export const getCurriculum = () => {
  return dispatch => {
    getCurriculumFromDB(dispatch);
  };
};
export const getTeacher = () => {
  return dispatch => {
    getTeacherFromDB(dispatch);
  };
};

export const getNotificationsBasedOnStudentID = id => {
  return dispatch => {
    getNotificationForStudentBasedFromDB(dispatch, id);
  };
};

// export const getNotification = () => {
//     return (dispatch) => {
//         getNotificationFromDB(dispatch);
//     }
// }
export const getNotification = () => {
  return dispatch => {
    getNotificationFromDB(dispatch);
  };
};


export const setKeyForNotificationPage = (notificationDetails) => {
  return { type: "GO_BACK_TO_NOTIFICATION", payload: notificationDetails };
}
