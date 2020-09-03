import firebase from 'firebase/app'
import 'firebase/database'
import { RootState } from 'store'
import config from './fbconfig'

firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const dataRef = databaseRef.child("data")
export const storeRef = databaseRef.child("store")

export function createStoreToFirebase(store: any) {
  const newRef = storeRef.push()
  newRef.set(store)
  return newRef.key
}

export function loadStateFromFirebase(id: string) {
  return storeRef.child(id)
}

export function saveStateToFirebase(store: any, id: string) {
  const ref = storeRef.child(id)
  ref.set(store)
  return id
}
export default firebase;