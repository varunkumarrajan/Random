const initialState = {
    docRef: '',
    err: ''
};
const curriculumReducer = (state = initialState, action) => {   
    switch (action.type) {  
        case 'SET_DOC_REF':
            return {
                ...state,
                docRef: action.ref
            }
        case 'ERROR':
            return {
                ...state,
                err: action.error
            }
        default:
            return state
    }
}
export default curriculumReducer