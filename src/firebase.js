import firebase from 'firebase'
import 'firebase/firestore';
import 'firebase/storage';

var config = {
  apiKey: "*************",
  authDomain: "************",
  databaseURL: "************",
  projectId: "***********",
  storageBucket: "**********-5996d.appspot.com",
  messagingSenderId: "889570571564"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export default firebase;