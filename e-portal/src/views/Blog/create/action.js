import { getBlogsFromDB } from '../../../database/dal/firebase/TeacherBlog';

export const getBlogsList = () => {
    return (dispatch) => {
        getBlogsFromDB(dispatch);
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