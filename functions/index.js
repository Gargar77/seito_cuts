const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const cors = require('cors')({origin:true});


function writeNewCut(prevData,requestData,docId) {
  if (!prevData) prevData = [];
  prevData.push(requestData);
  admin.firestore().collection('cuts').doc(docId).set({cutData:prevData})
}

exports.addCut = functions.https.onRequest((req,res)=> {
  cors(req,res, async () => {
    try {
      const prevDataRef = await admin.firestore().collection('cuts').doc(req.body.date).get();
      const prevData = prevDataRef.data();
      if (!prevData) {
        await writeNewCut(prevData,req.body,req.body.date);
        res.status(200).send({result:'New cut added to empty Queue!'})
      } else if(prevData.cutData.length < 3) {
        await writeNewCut(prevData.cutData,req.body,req.body.date);
        res.status(200).send({result:'New cut added to existing Queue!'})
      } else {
        res.status(400).send({result:'Queue is Full!'})
      }
    } catch (error) {
      functions.logger.log('An unexpected error occured when adding a cut:',error);
      res.status(500).send({result:'Failed to add cut'})
    }
  })
})
