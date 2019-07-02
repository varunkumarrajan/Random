import { getCategoryFromDB, manageCategoryFromDB } from './../../database/dal/firebase/categoryDal'

export const getCategory = () => {
    return (dispatch) => {
        getCategoryFromDB(dispatch);
    }
}
export const manageCategory = (tree, state) => {
    return (dispatch) => {
        manageCategoryFromDB(dispatch, tree, state);
    }
}
export const openModal = () => {
    return {
        type: 'OPEN'
    }
}

export const closeModal = () => {
    return {
        type: 'CLOSE'
    }
}