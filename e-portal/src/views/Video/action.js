import { getContentFromDB } from '../../database/dal/firebase/curriculumDal';

export const openModal = () => {
    return {
        type: 'OPEN'
    }
}

export const closeModal = () => {
    return (dispatch) => {
        dispatch(getContentFromDB(dispatch,JSON.parse(localStorage.getItem('userProfile')).userId))
        dispatch({type: 'CLOSE'})
    }
}

export const getContent = (uid) => {
    return (dispatch) => {
        getContentFromDB(dispatch, uid);
    }
}