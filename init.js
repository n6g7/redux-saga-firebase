export const config = {
  authProvider: null,
  firebase: null,
};

export default function(firebase, authProvider) {
  config.authProvider = authProvider;
  config.firebase = firebase;
}
