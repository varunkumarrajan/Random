import dbFactory from '../../dbFactory';

const getDbRef = collectionName => {
  const db = dbFactory.create('firebase');
  const ref = db.firestore().collection(collectionName);
  return ref;
};

export const getBannerFromDB = () => {
  return getDbRef('banner').where('page', '==', 'home');
};

export const getCurriculumFromDB = () => {
  return getDbRef('curriculum');
};

export const getTeacherFromDB = () => {
  return getDbRef('userProfiles').where('role', '==', 'Teacher');
};

export const getFeedbackFromDB = teacherID => {
  if (teacherID) {
    return getDbRef('feedback')
      .where('feedback_to', '==', teacherID)
      .orderBy('created_date', 'desc');
  } else {
    return getDbRef('feedback').orderBy('created_date', 'desc');
  }
};

export const getUserProfileFromDB = userId => {
  if (userId) {
    return getDbRef('userProfiles').where('userId', '==', userId);
  } else {
    return getDbRef('userProfiles');
  }
};

export const getBlogFromDB = () => {
  return getDbRef('blogs');
};
