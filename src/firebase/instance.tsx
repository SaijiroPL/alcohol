import firebase from 'firebase/app'
import 'firebase/database'
import config from './fbconfig'

firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const dataRef = databaseRef.child("data")
export default firebase;