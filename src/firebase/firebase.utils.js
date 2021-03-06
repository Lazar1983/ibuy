import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAq-ybFQiJIsOyej5dMYjax0PCkWbveNhQ",
    authDomain: "ibuy-fa43e.firebaseapp.com",
    databaseURL: "https://ibuy-fa43e.firebaseio.com",
    projectId: "ibuy-fa43e",
    storageBucket: "ibuy-fa43e.appspot.com",
    messagingSenderId: "562448424238",
    appId: "1:562448424238:web:10187fe13ee85a497eaebf",
    measurementId: "G-E8GXGXNY6H"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
  
    return userRef;
  };
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;