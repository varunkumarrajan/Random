import { getCurriculumFromDB } from './../../database/dal/firebase/carouselDal';

export const getCurriculum = () => {
    return (dispatch) => {
        getCurriculumFromDB(dispatch);
    }
}