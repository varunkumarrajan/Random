import { getStudentFromDB} from './../../database/dal/firebase/eventDal'

export const openModalPopUp = () => {
    return {
        type: 'OPEN_MODAL'
    }
}


export const getStudentList = () => {
    return (dispatch) => {
        getStudentFromDB(dispatch);
    }
}