const initialState = {
    notifications: [],
    openModal: false, 
    notificationDetails : []
}
const notifDetils = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_NOTIFICATION':
            return {
                ...state,
                notifications: action.notifications
            }
        case 'NOTIFICATIONS_DETAILS':
            return {
                ...state,
                notificationDetails: action.payload
            }
        default:
            return state
    }
}
export default notifDetils;