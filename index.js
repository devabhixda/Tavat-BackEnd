const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.addChatRoom = functions.https.onCall((data, context) => {
  const ChatRoom = admin.firestore().collection("chatRoom").doc(data["chatRoomId"]);
  return ChatRoom.set({
    "users": data["users"],
    "chatRoomId" : data["chatRoomId"],
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

exports.updated = functions.https.onCall((data, context) => {
  const chatMessage = admin.firestore().collection("chatRoom").doc(data["chatRoomId"]);
  return chatMessage.update({
    "updatedAt": data["updatedAt"]
  });
});

exports.checkIn = functions.https.onCall((data, context) => {
  const location = admin.firestore().collection("users").doc(data["uid"]).collection("checkin");
  location.add({
    'location': data["location"],
    'vincinity': data["vincinity"],
    'date': data["date"],
    "time": data["time"],
    'virtual': data["virtual"]
  });
  const loc = admin.firestore().collection("users").doc(data["uid"]);
  return loc.update({
    'location': data["location"],
    'checkName': data["checkName"],
    'virtual': data["virtual"]
  });
});

exports.updateProfile = functions.https.onCall((data, context) => {
  const profile = admin.firestore().collection("users").doc(data["uid"]);
  return profile.update({
    "about": data["about"],
    "interests": data["interests"]
  });
});