// Simple React Native specific changes
import firebase from 'firebase';
import Secrets from 'react-native-config'

firebase.initializeApp({
  apiKey: Secrets.FIREBASE_API_KEY,
  authDomain: "bitrain-mnemonic.firebaseapp.com",
  databaseURL: "https://bitrain-mnemonic.firebaseio.com",
  projectId: "bitrain-mnemonic",
  storageBucket: "bitrain-mnemonic.appspot.com",
  messagingSenderId: "234200582478",
});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);


export default {
  // font scaling override - RN default is on
  allowTextFontScaling: true
}
