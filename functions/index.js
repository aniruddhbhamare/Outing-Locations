const functions = require('firebase-functions');
const cors =require('cors')({origin:true});
const fs = require('fs');
const UUID = require('uuid-v4');
const admin =require("firebase-admin");

// const gcconfig = {
//     projectId:"places-72147",
//     keyFilename:"places.json"
// };

// const gcs = require("@google-cloud/storage")(gcconfig);
const { Storage } = require('@google-cloud/storage');
const gcs = new Storage();
admin.initializeApp({
    credential:admin.credential.cert(require("./places.json"))
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request,response,() => { 
        if(
            !request.headers.authorization ||
            !request.headers.authorization.startsWith("Bearer ")
        ){
            console.log("No token present!");
            response.status(403).json({error: "Unauthorized"});
            return;
        }
        let idToken;
        idToken = request.headers.authorization.split("Bearer ")[1];
        admin.auth().verifyIdToken(idToken)
        .then(decodedToken =>{
            const body =JSON.parse(request.body);

        fs.writeFileSync("/tmp/uploaded-image.jpg",body.image,"base64",err=>{
            console.log(err);
            return response.status(500).json({error:err});
        });
        //store file in google colude storage/firbase cloud storage
        const bucket = gcs.bucket("places-72147.appspot.com");
        const uuid = UUID();
        bucket.upload("/tmp/uploaded-image.jpg",{
            uploadType:"media",
            destination: "/places/" + uuid + ".jpg",
            metadata:{
                metadata:{
                    contentType:"image/jpeg",
                    firebaseStorageDownloadTokens: uuid
                }
            }
        }, (err,file)=>{
            if(!err){
                response.status(201).json({
                    imageUrl: "https://firebasestorage.googleapis.com/v0/b/" +
                        bucket.name + 
                        "/o/" +
                        encodeURIComponent(file.name) +
                        "?alt=media&token=" + 
                        uuid
                });
            } else {
                console.log(err);
                response.status(500).json({error:err}); 
            };
         });
        })
        .catch(error =>{
            console.log("Token is invalid!");
            response.status(403).json({error:"Unauthorized"});
        });
    });
});
