import dbFactory from '../../dbFactory';

const getDbRef = collectionName => {
  const db = dbFactory.create('firebase');
  const ref = db.firestore().collection(collectionName);
  return ref;
};


export const getTeacherDetailFromDB = (userId) => {
    return getDbRef('userProfiles')
    .where('userId', '==', userId)
    .get();
}

export const getTotalRating = (collection, userId) => {
  return getDbRef(collection)
    .where('userId', '==', userId)
    .get();
}



export const getTeacherRating = (teacherId) => {
  return getDbRef('userRating').doc(teacherId).get();
}
export const saveTeacherRating = (reacherId, data) => {
  return getDbRef('userRating').doc(reacherId).set(data);
}
export const saveTeacherRatingOnProfile = (reacherId, data) => {
  return getDbRef('userProfiles').doc(reacherId).set(data);
}

export const saveLike = (reacherId, data) => {
  return getDbRef('userRating').doc(reacherId).set(data);
}