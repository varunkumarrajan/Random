import dbFactory from '../../dbFactory';

export const getCurriculumFromDB = (dispatch) => {
    const db = dbFactory.create('firebase');
    let data = [];
    db.firestore().collection("curriculum").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            data.push(doc.data())
        })
        dispatch({type:'GET_CURRICULUM', curriculumData: data})
    }) 
    .catch(err => {
        dispatch({type: 'ERROR', err})
    })              
}