const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const cors = require('cors')({origin:true});



exports.addMessage = functions.https.onRequest((req, res) => {
  cors(req,res, async () => {
    const original = req.body;
    const writeResult = await admin.firestore()
      .collection("messages").add({original: original});
    res.status(200).send({result: `Message with ID: ${writeResult.id} added.`});
  })
});
