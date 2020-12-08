const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.addChatRoom = functions.https.onCall((data, context) => {
  const ChatRoom = admin.firestore().collection("chatRoom").doc(data["chatRoomId"]);
  return ChatRoom.set({
      chatRoom: data["chatRoom"]
  });
});

exports.addMessage = functions.https.onCall((data, context) => {
  const chatMessage = admin.firestore().collection("chatRoom").doc(data["chatRoomId"]).collection("chats");
  return chatMessage.add({
    "sendBy": data["sendBy"],
    "message": data["message"],
    "time": data["time"]
  });
});