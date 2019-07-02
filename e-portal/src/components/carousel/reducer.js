const initialState = {
    carouselData: [],
    openModal: false
}
const carouselReducer = (state = initialState, action) => {
    switch (action.type) {  
        case 'GET_CURRICULUM':
            return {                
                ...state,                               
                carouselData: action.curriculumData
            } 
        case 'MANAGE_CATEGORY':
            return {
                ...state,
                tree: action.category
            }                
        default:
            return state
    }
}
export default carouselReducer