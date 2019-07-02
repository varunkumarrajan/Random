import dbFactory from '../../dbFactory';

const getDbRef = collectionName => {
  const db = dbFactory.create('firebase');
  const ref = db.firestore().collection(collectionName);
  return ref;
};

export const saveRecord = userDetails => {
  return getDbRef('users')
    .doc(userDetails.userId)
    .set(userDetails);
};

export const getUserRating = userId => {
  return getDbRef('userRating')
    .doc(userId)
    .get();
};

export const createRatingRecord = (ratingDetails, userId) => {
  return getDbRef('userRating')
    .doc(userId)
    .set(ratingDetails);
};

export const getProfileStatus = userId => {
  return getDbRef('users')
    .where('userId', '==', userId)
    .get();
};

export const getUserProfile = userId => {
  return getDbRef('userProfiles')
    .where('userId', '==', userId)
    .get();
};

export const fetchProviders = user => {
  const db = dbFactory.create('firebase');
  return db.auth().fetchSignInMethodsForEmail(user.username);
};

export const createUserWithEmail = user => {
  const db = dbFactory.create('firebase');
  return db.auth().createUserWithEmailAndPassword(user.username, user.password);
};

export const signInUserWithEmail = user => {
  const db = dbFactory.create('firebase');
  return db.auth().signInWithEmailAndPassword(user.username, user.password);
};

export const loginWithGoogle = () => {
  const db = dbFactory.create('firebase');
  const provider = new db.auth.GoogleAuthProvider();
  return db.auth().signInWithPopup(provider);
};

export const loginWithFacebook = () => {
  const db = dbFactory.create('firebase');
  const provider = new db.auth.FacebookAuthProvider();
  return db.auth().signInWithPopup(provider);
};

export const loginWithTwitter = () => {
  const db = dbFactory.create('firebase');
  const provider = new db.auth.TwitterAuthProvider();
  return db.auth().signInWithPopup(provider);
};

export const recoverPassword = email => {
  const db = dbFactory.create('firebase');
  let continueUrl = 'http://localhost:3000/?email=';
  if (process.env.NODE_ENV === 'production') {
    continueUrl = 'https://e-project-4e023.firebaseapp.com/?email=';
  }
  var actionCodeSettings = {
    url: continueUrl + email,
    handleCodeInApp: false
  };
  return db.auth().sendPasswordResetEmail(email, actionCodeSettings);
};

export const saveUserProfile = userDetails => {
  getProfileStatus(userDetails.userId).then(querySnapshot => {
    querySnapshot.forEach(doc => {
      let user = doc.data();
      user.profileSaved = true;
      saveRecord(user);
    });
  });

  return getDbRef('userProfiles')
    .doc(userDetails.userId)
    .set(userDetails);
};

const getStorageRef = () => {
  const db = dbFactory.create('firebase');
  const storageService = db.storage();
  return storageService.ref();
};

export const uploadUserProfilePic = (profilePic, userId) => {
  const storageRef = getStorageRef();
  const type = profilePic.type.split('/');
  const mainImage = storageRef.child(`profilepic/${userId + '.' + type[1]}`);
  return mainImage.put(profilePic);
};

export const getProfileDownloadUrl = (profilePic, userId) => {
  const storageRef = getStorageRef();
  const type = profilePic.type.split('/');
  const mainImage = storageRef.child(`profilepic/${userId + '.' + type[1]}`);
  return mainImage.getDownloadURL();
};
