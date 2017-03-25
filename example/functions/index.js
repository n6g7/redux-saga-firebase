const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

exports.ping = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.json({
      pong: request.query.ping
    });
  });
});
