const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();


exports.addMessage = functions.https.onRequest( async (req, res) => {
  const original = req.query.text;
  const writeResult = await admin.firestore()
      .collection("messages").add({original: original});
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

