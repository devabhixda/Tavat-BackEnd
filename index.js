const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.addChatRoom = functions.https.onCall((data, context) => {
  const ChatRoom = admin.firestore().collection("chatRoom").doc(data["chatRoomId"]);
  return ChatRoom.set({
      chatRoom: data["chatRoom"]
  });
});