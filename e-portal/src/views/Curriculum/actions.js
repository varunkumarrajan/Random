import { saveFileMetaDataFromDB } from './../../database/dal/firebase/curriculumDal'

export const saveFileMetaData = (fileName, user, docRef, fields, type) => {
    return (dispatch) => {
        saveFileMetaDataFromDB(dispatch, fileName, user, docRef, fields, type);
    }
}