import dbFactory from '../../dbFactory'
import { toastr } from "react-redux-toastr";

const db = dbFactory.create('firebase');

const getDbRef = collectionName => {
    const db = dbFactory.create('firebase');
    const ref = db.firestore().collection(collectionName);
    return ref;
};

export const saveFileMetaDataFromDB = (dispatch, fileName, user, doc, fields, type) => {
    let actualFileName;
    if(type === 'video') {
        actualFileName = fileName.split(/\.(?=[^\.]+$)/);
    }
    const metaData = {
        userId: user.userId,
        views: 0,
        rating: 0,
        fileName: fileName,
        src:'',    
        title: (type === 'video' ) ? actualFileName[0] : '',
        desc: '',
        tags: '',
        videoMetadata: [],
        thumb: '',
        thumbFileName: '',
        status: true,
        category: '',
        isPending: (user.role === 'Teacher') ? false : true,
        created: db.firestore.FieldValue.serverTimestamp()
    }
    if(type === 'metadata') {
        db.firestore().collection('curriculum').doc(doc).update(fields)
        .then(function(){
        })
        .catch(function(err) {
            dispatch({type: 'ERROR', err})
        });
    }else if(type !== 'metadata') {
        db.storage().ref(`curriculum/${user.userId}`).child(fileName).getDownloadURL().then(url => {
            if(type === 'video') {
                metaData.src = url
                db.firestore().collection('curriculum').add(metaData)
                .then(function(docRef) {
                    dispatch({type: 'SET_DOC_REF', ref: docRef.id})
                })
                .catch(function(err) {
                    dispatch({type: 'ERROR', err})
                });
            } else if(type === 'thumb') {
                db.firestore().collection('curriculum').doc(doc).update({
                    thumbFileName : fileName,
                    thumb: url
                }).then(function(){
                })
                .catch(function(err) {
                    dispatch({type: 'ERROR', err})
                });
            }
        })       
    }
}


export const getContentFromDB = (dispatch, uid) => {
    db.firestore().collection("curriculum").where("userId", "==", uid)
    .onSnapshot(function(querySnapshot) {
        let content = [];
        querySnapshot.forEach(function(doc) {
            content.push(doc.data());
        });
        dispatch({type: 'GET_CONTENT',content})
    });
}

export const getCurriculumByTeacherId = (uid) => {
    return getDbRef('curriculum')
    .where('userId', '==', uid)
    .get();
}

export const getBannerFromDB = () => {
    return getDbRef("banner")
    .where("page", "==", "teacher")
    .get() 
}

export const getCurriculumFromDB = (uid) => {   
    return (uid) ? 
    getDbRef("curriculum").orderBy("created", "desc").where('userId', '==', uid) :  
    getDbRef("curriculum").orderBy("created", "desc")
}
export const getReviewContentFromDB = (uid, status) => {
    return getDbRef("notifications").where('tid', '==', uid).where('tStatus' , '==', status)
} 
export const getNotificationFromDB = () => {
    const db = dbFactory.create('firebase');
    return db.firestore().collection("notifications").get();       
}

export const updateRatingOnCurriculumFromDB = (id,videoMetadata,rating) => {
    getDbRef("curriculum").doc(id).update({videoMetadata,rating})
}
export const deleteContentWithDocFromDB = (map) => {
    let ref = db.storage();
    map.forEach(value => {
        let fileNameWithPath = `curriculum/${value.userId}/${value.videoDetails.fileName}`
        let createVideoRef = ref.ref().child(fileNameWithPath);
        createVideoRef.delete().then(function(){
            if(value.videoDetails.thumbFileName){
                fileNameWithPath = `curriculum/${value.userId}/${value.videoDetails.thumbFileName}`
                let createThumbRef = ref.ref().child(fileNameWithPath)
                createThumbRef.delete().then(function(){
                }).catch(err => {
                    toastr.warning('', err.message);
                })
            }
            db.firestore().collection('curriculum').doc(value.videoDetails.id).delete().then(function() {                
            }).catch(err => {
                toastr.warning('', err.message);
            });
        }).catch(err => {
            toastr.warning('', err.message);
        })
    })
}
// export const getNotificationFromDB = (dispatch) => {
//     let data = [];
//     const db = dbFactory.create('firebase');
//     db.firestore().collection("notifications")
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             console.log(doc.data(), 'getNotification');
//             data.push(doc.data())
//         })
//         dispatch({type:'GET_NOTIFICATION', NotificationData: data})
//     }) 
//     .catch(err => {
//         dispatch({type: 'ERROR', err})
//     })              
// }