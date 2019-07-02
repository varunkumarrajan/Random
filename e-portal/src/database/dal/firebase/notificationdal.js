import dbFactory from "../../dbFactory";
import { toastr } from "react-redux-toastr";
const getDbRef = collectionName => {
  const db = dbFactory.create("firebase");
  const ref = db.firestore().collection(collectionName);
  return ref;
};

export const saveNotification = notificationDetails => {
  const db = dbFactory.create("firebase");
  getDbRef("notifications")
    .doc(notificationDetails.id)
    .set(
      {
        ...notificationDetails,
        created: db.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
};
export const getNotificationFromDB = dispatch => {
  const db = dbFactory.create("firebase");
  let data = [];
  db.firestore()
    .collection("notifications")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if (doc.exit) {
          data.push(doc.data());
        }
      });
      dispatch({ type: "GET_NOTIFICATIONS", notifications: data });
    })
    .catch(err => {
      dispatch({ type: "ERROR", err });
    });
};

export const getNotificationForStudentBasedFromDB = (dispatch, id) => {
  const db = dbFactory.create("firebase");
  let data = [];
  db.firestore()
    .collection("notifications")
    .where("loggedInUserId", "==", id)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if (doc.exists) {
          data.push(doc.data());
        }
      });
      dispatch({
        type: "GET_NOTIFICATIONS_STUDENT_ID",
        notificationsBasedOnStudent: data
      });
    })
    .catch(err => {
      dispatch({ type: "ERROR", err });
    });
};

export const rejectNotificationFromDB = (
  dispatch,
  rejectedNotificationsDetails
) => {
  getDbRef("notifications")
    .doc(rejectedNotificationsDetails.id)
    .set(rejectedNotificationsDetails)
    .then(() => {
      dispatch({ type: "REJECT_NOTIFICATION" });
    });
};

export const deleteNotificationFromDB = (
  dispatch,
  deleteNotificationsDetails
) => {
  getDbRef("notifications")
    .doc(deleteNotificationsDetails.id)
    .delete()
    .then(() => {
      dispatch({ type: "DELETE_NOTIFICATION" });
    });
};

export const saveNotificationAcceptedFromDB = (
  dispatch,
  acceptedNotificationsDetails
) => {
  getDbRef("notifications")
    .doc(acceptedNotificationsDetails.id)
    .set(acceptedNotificationsDetails)
    .then(() => {
      dispatch({ type: "REJECT_NOTIFICATION" });
    });
};

export const getVideoUrl = (name, id) => {
  // let studentDetails = [];
  // const studentDetails = JSON.parse(localStorage.getItem("userProfile"));
  const db = dbFactory.create("firebase");
  return db
    .storage()
    .ref("notification/" + id)
    .child(name)
    .getDownloadURL();
};

export const setIDForNotificationFromDB = (dispatch, id) => {
  const db = dbFactory.create("firebase");
  let data = [];
  db.firestore()
    .collection("notifications")
    .where("id", "==", id)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        data.push(doc.data());
        console.log("data in notification", data);
      });
      dispatch({
        type: "GET_NOTIFICATION_BY_ID",
        notificationDetailsByID: data
      });
    })
    .catch(err => {
      dispatch({ type: "ERROR", err });
    });
};
export const saveNotificationDetails = notificationDetails => {
  const db = dbFactory.create("firebase");
  notificationDetails.created = db.firestore.FieldValue.serverTimestamp()
  
  db.firestore()
    .collection("notifications")
    .doc(notificationDetails.id)
    .set(notificationDetails)
    .then(() => {
      toastr.success(" Request created successfully.");
    });
};
