const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const cors = require('cors')({origin:true});


const writeNewCut = async (prevData,requestData,docId) => {
  if (!prevData) prevData = [];
  prevData.push(requestData);
  await admin.firestore().collection('cuts').doc(docId).set({cutData:prevData})
}

const deleteCut = async (data,docId,cutId) => {
  const newData = data.filter((el)=> el.id !== cutId);
  await admin.firestore().collection('cuts').doc(docId).set({cutData:newData})
}


exports.addCut = functions.https.onRequest( async (req,res)=> {
  await cors(req,res, async ()=> {
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

exports.removeCut = functions.https.onRequest( async (req,res)=> {
  await cors(req,res, async ()=> {
    const currentDataRef = await admin.firestore().collection('cuts').doc(req.body.date).get();
    const currentData = currentDataRef.data();
    if (!currentData) {
      res.status(400).send({result:"Queue does not exist!"})
    } else {
      try {
        await deleteCut(currentData.cutData,req.body.date,req.body.id);
        res.status(200).send({result:'cut deleted Successfully'})
      } catch (error) {
        functions.logger.log('An unexpected error occured when deleting a cut:',error);
        res.status(500).send({result:'Failed to delete cut'})
      }
      
    } 
  })
})
