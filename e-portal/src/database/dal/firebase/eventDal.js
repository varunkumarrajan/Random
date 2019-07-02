import dbFactory from '../../dbFactory';
// import firebase from 'firebase';
import { toastr } from 'react-redux-toastr';
/* const getDbRef = collectionName => {
    const db = dbFactory.create('firebase');
    const ref = db.firestore().collection(collectionName);
    return ref;
  };
 */
export const  getStudentFromDB = (dispatch) => {
    const student = [];
    const db = dbFactory.create('firebase');
    db.firestore().collection('users').get()
            .then((querySnapshot) => {
                    querySnapshot.docs.forEach(doc => {
                        student.push(doc.data())
                  });
                dispatch({type:'GET_STUDENTS', student})
            }).catch(err => {
                dispatch({type: 'ERROR', err})
            })
    
}

export const saveEventDetails = eventDetails => {
    const db = dbFactory.create('firebase');
    db.firestore().collection('events').doc(eventDetails.userId).set(eventDetails).then(() => {
        toastr.success('Event Details Saved Successfully');
        
      })
  };
  
