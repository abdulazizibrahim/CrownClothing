import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDc9bt9IIEhrNGsANr_j3uq26RUC2QH1Lw",
    authDomain: "crwn-db-92644.firebaseapp.com",
    databaseURL: "https://crwn-db-92644.firebaseio.com",
    projectId: "crwn-db-92644",
    storageBucket: "crwn-db-92644.appspot.com",
    messagingSenderId: "1075871611586",
    appId: "1:1075871611586:web:b2a128070089dbb6f5595b",
    measurementId: "G-6HGFRHGETD"
};

export const createUserProfileDocument = async (userAuth, additionalData) =>{
    if(!userAuth) return ;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get(); 
    console.log(snapShot);

    if(!snapShot.exists)
    {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
             await userRef.set({displayName, email, createdAt, ...additionalData})
        }
        catch(error)
        {
            console.log('error exists creating user', error.message());
        }
    }

    return userRef;
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
