import dbFactory from '../../dbFactory';

const getDb = () => {
  return dbFactory.create('firebase');
};

export const changePassword = newPassword => {
  const user = getDb().auth().currentUser;
  return user.updatePassword(newPassword);
};
