// the base firebase app
import firebase from 'firebase/app'
// the products we want to use
import 'firebase/firestore';
import 'firebase/auth';
import {config} from './firebaseConfig';


export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        let firstName,lastName;
        if (userAuth.displayName) {
            let [first,middle,last=''] = userAuth.displayName.split(' ');
            firstName = first;
            if (last === '') lastName = middle;
        }
        const { email } = userAuth;
      
      
        const createdAt = new Date();
        try {
            await userRef.set({
                first:firstName || "",
                last:lastName || "",
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user',error.message)
            throw new Error('auth error')
        }
    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
/* this parameter lets google prompt to select 
an account everytime the provider istance is used*/
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

//lets also export the firebase app itself in case it needs to get used elsewhere.
export default firebase;