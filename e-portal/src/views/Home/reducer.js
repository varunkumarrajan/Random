const initialState = {
    bannerCarouselData: [],
    carouselData: [],
    teacherCarouselData: [],
    openModal: false
}
const homeReducer = (state = initialState, action) => {
    switch (action.type) {  
        case 'GET_BANNER':
        return {                
            ...state,                               
            bannerData: action.bannerCarouselData
        }    
        case 'GET_CURRICULUM':
            return {                
                ...state,                               
                carouselData: action.curriculumData
            }
        case 'GET_TEACHER':
        return {                
            ...state,                               
            teacherCarouselData: action.teacherCurriculumData
        }    
                   
        default:
            return state
    }
}
export default homeReducer