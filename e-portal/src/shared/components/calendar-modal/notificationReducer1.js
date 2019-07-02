const initialState = {
    notificationDetails: {}
};
const notificationReducer = (state = initialState, action) => {
    console.log("Notification Action Type ", action.type)
    switch (action.type) {
        case 'GET_NOTIFICATIONS':
            return {
                ...state,
                notificationDetails: action.notifications
            };

        default:
            return state;
    }
};
export default notificationReducer;
