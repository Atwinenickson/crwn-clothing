import firebase from 'firebase/app'

import 'firebase/firestore'

import 'firebase/auth'


const config = {
    apiKey: "AIzaSyCI4lzNP6nEfkyw5sSSdU3vGv8gYduvJ0U",
    authDomain: "crwn-db-4afba.firebaseapp.com",
    databaseURL: "https://crwn-db-4afba.firebaseio.com",
    projectId: "crwn-db-4afba",
    storageBucket: "crwn-db-4afba.appspot.com",
    messagingSenderId: "757676598521",
    appId: "1:757676598521:web:22391629621300ca316e28",
    measurementId: "G-LESKV4E347"
  };

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if (!userAuth)return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      }) 
      
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config)

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;