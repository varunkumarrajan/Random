import { getBannerFromDB, getCurriculumFromDB, getTeacherFromDB } from '../../database/dal/firebase/homeDal';

export const getBanner = () => {
    return (dispatch) => {
        getBannerFromDB(dispatch);
    }
}

export const getCurriculum = () => {
    return (dispatch) => {
        getCurriculumFromDB(dispatch);
    }
}

export const getTeacher = () => {
    return (dispatch) => {
        getTeacherFromDB(dispatch);
    }
}