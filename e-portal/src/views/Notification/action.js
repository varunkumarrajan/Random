import { getNotificationsFromDB} from '../../database/dal/firebase/studentDal';
import { deleteNotificationFromDB } from '../../database/dal/firebase/notificationdal';
export const getNotifications = () => {
    return (dispatch) => {
        getNotificationsFromDB(dispatch);
    }
}


export const setNotificationDetails = (details) => {
    return { type: "NOTIFICATIONS_DETAILS", payload: details };
}

export const deleteNotificationDetails = (details) => {
    return (dispatch) => {
        deleteNotificationFromDB(dispatch, details);
    }
}

