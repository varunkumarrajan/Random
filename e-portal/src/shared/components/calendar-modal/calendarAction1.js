import { getNotificationFromDB } from '../../../database/dal/firebase/chatNotificationDal';


export const getNotification = () => {
    return (dispatch) => {
        getNotificationFromDB(dispatch);
    }
}
