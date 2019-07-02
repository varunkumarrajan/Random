const initialState = {
    openModal: false,
    keyForNotification: '',
    notificationDetails : [], 
    notificationDetailsByID : []
}
const notificationAcceptREducer = (state = initialState, action) => {

    switch (action.type) {
        case 'OPEN_MODAL_FOR_ACCEPT':
            return {
                ...state,
                openModal: true
            };
        case 'CLOSE_NOTIFICATION_POP':
            return {
                ...state,
                openModal: false
            };
            
            case 'GO_BACK_TO_NOTIFICATION':
            return {
                ...state,
                keyForNotification: action.payload
            };

            case 'GET_NOTIFICATION_BY_ID':
            return {
                ...state,
                notificationDetailsByID: action.notificationDetailsByID
            };
        default:
            return state
    }
}
export default notificationAcceptREducer;