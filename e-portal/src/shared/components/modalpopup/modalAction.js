import {getNotificationFromDB}  from '../../../database/dal/firebase/notificationdal';

export const closeModalPopUp = () => {
    return {
        type: 'CLOSE_MODAL'
    }
}


export const saveStudent = () => {
  return {
    type: 'SAVE_STUDENTS'
  };
};

export const addStudentNames = studentNames => {
  return {
    type: 'TAGGED_STUDENTS_NAMES',
    taggedStudentNames: studentNames
  };
};

export const addStudent = student => {
  return {
    type: 'TAGGED_STUDENTS',
    taggedStudent: student
  };
};

export const getNotifications = () => {
  return (dispatch) => {
    getNotificationFromDB(dispatch);
  }
}
