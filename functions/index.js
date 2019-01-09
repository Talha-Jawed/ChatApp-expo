const functions = require('firebase-functions');
var fatch = require('node-fetch');

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.database.ref('contact/{id}')
    .onCreate(event => {

        const root = event.data.ref.root
        var messages = []

        return root.child('/UserData').once('value').then(function (snapshot) {

            snapshot.forEach(function (childSnapshot) {
                if (expoToken) {
                    messages.push({
                        "to": expoToken,
                        "body": "new node added"
                    })
                }
            })
            return Promise.all(messages)
        }).then(messages => {

            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(messages)
            })
        })


    })

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
