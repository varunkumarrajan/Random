import dbFactory from '../../dbFactory';

const getDbRef = collectionName => {
    const db = dbFactory.create('firebase');
    const ref = db.firestore().collection(collectionName);
    return ref;
};

export const saveCommentDetails = commentDetails => {
    return getDbRef('feedback').doc().set(commentDetails);
};


// export const getTeacherRating = (teacherId) => {
//     return getDbRef('userRating').doc(teacherId).get();
// }

export const getCommentRating = (commentId) => {
    return getDbRef('feedback').doc(commentId);
}

export const saveTeacherRating = (reacherId, data) => {
    return getDbRef('userRating').doc(reacherId).set(data);
}

// export const saveTeacherRatingOnProfile = (reacherId, data) => {
//     return getDbRef('userProfiles').doc(reacherId).set(data);
// }

export const saveLike = (commentId, data) => {
    // return getDbRef('feedback').doc(commentId).set(data);
    // return getDbRef('feedback').doc(commentId).update({foo: "bar"});
    return getDbRef('feedback').doc(commentId).update(data);
}
