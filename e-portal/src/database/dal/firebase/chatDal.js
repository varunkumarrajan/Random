import dbFactory from "../../dbFactory";

const getDbRef = collectionName => {
  const db = dbFactory.create("firebase");
  const ref = db.firestore().collection(collectionName);
  return ref;
};
export const getChatFromDB = (senderId,recieverId) => {
    return getDbRef("chat").doc(`${senderId}${recieverId}`);
}
export const saveIndividualChatToDB = (senderId, recieverId, chatData) => {
  return getDbRef("chat")
    .doc(senderId + recieverId)
    .set({messageList: chatData});
};
