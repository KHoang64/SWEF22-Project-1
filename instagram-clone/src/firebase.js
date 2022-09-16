// version 9
// import { getFirestore } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import { GoogleAuthProvider, getAuth } from "firebase/auth";
// import {getStorage } from "firebase/storage";
// const firebaseConfig= {
//   apiKey: "AIzaSyDyvqvwvOpWqcFwDULtxSjL2Zz7RBlkSfE",
//   authDomain: "instagram-clone-withfirebase.firebaseapp.com",
//   projectId: "instagram-clone-withfirebase",
//   storageBucket: "instagram-clone-withfirebase.appspot.com",
//   messagingSenderId: "559307400950",
//   appId: "1:559307400950:web:f3c0482b1091161f926ed7",
//   measurementId: "G-GM0375YPZP"
// };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage(app);

//   export { db, auth, storage };
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSoip8gHHtrRpJu6uPAOrh4go6xXUnck0",
  authDomain: "instagram-clone-c6be2.firebaseapp.com",
  projectId: "instagram-clone-c6be2",
  storageBucket: "instagram-clone-c6be2.appspot.com",
  messagingSenderId: "77122228162",
  appId: "1:77122228162:web:900f7a99ba9a153b25d05b",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp);

export { auth, db, storage };
