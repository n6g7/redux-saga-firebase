const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

const app = admin.initializeApp(functions.config().firebase);

exports.ping = functions.https.onRequest((request, response) => {
  admin.messaging().sendToDevice(request.query.token, {
    notification: {
      title: "Todo item created",
      body: request.query.ping
    },
    data: {
      message: request.query.ping,
    }
  }).then(function(response) {
    console.log("Successfully sent message:", response);
  }).catch(function(error) {
    console.log("Error sending message:", error);
  });

  cors(request, response, () => {
    response.json({
      pong: request.query.ping
    });
  });
});
