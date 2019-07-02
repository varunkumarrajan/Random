import dbFactory from '../../dbFactory';

const getDbRef = collectionName => {
    const db = dbFactory.create("firebase");
    const ref = db.firestore().collection(collectionName);
    return ref;
  };
export const getTeachersFromDBBasedOnCategory = (dispatch,selectedSubject) => {
    const db = dbFactory.create('firebase');
    let data = [];
    // let teacherStudentQuery = 
    db.firestore().collection("userProfiles")
    .where("role", "==", "Teacher")
    .where("subject", "==", selectedSubject)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            data.push(doc.data())
        })
        dispatch({type:'GET_TEACHERS', Teachers: data})
    }) 
    .catch(err => {
        dispatch({type: 'ERROR', err})
    })              
}



export const getNotificationFromDB = (dispatch) => {
    let data = [];
    const db = dbFactory.create('firebase');
    db.firestore().collection("notifications")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.data(), 'getNotification');
            data.push(doc.data())
        })
        dispatch({type:'GET_NOTIFICATION', NotificationData: data})
    }) 
    .catch(err => {
        dispatch({type: 'ERROR', err})
    })              
}

export const getNotificationsFromDB = (id, role) => {
    let query = getDbRef("notifications")
    if(role === 'Teacher'){
        query = query.where('tId' , '==', id)
    }else{
         query = query.where('sId', '==', id)
    }
    query = query.orderBy("created", "desc")
    return query;
};

export const getBannerFromDB = () => {
    const db = dbFactory.create('firebase');
    return db.firestore().collection("banner")
    .where("page", "==", "student")
    .get()
 
}



