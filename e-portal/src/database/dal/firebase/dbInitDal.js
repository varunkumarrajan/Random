import dbFactory from '../../dbFactory';
import { exists } from 'fs';

const getDbRef = collectionName => {
  const db = dbFactory.create('firebase');
  const ref = db.firestore().collection(collectionName);
  return ref;
};

export const getAllCategory = () => {
  return getDbRef('subject')
    .doc('B95MoOWUo1V7rCNbN7hn')
    .get();
};

export const createSubjects = subjects => {
  return getDbRef('subject')
    .doc('B95MoOWUo1V7rCNbN7hn')
    .set(subjects);
};

// For checking banner existance.
export const getBannerFromDB = () => {
  return getDbRef('banner').get();
};

// create banner document if not exists.
export const createBanner = bannerData => {
  return getDbRef('banner')
    .doc()
    .set(bannerData);
};
