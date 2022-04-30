import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDELT1aDdi_fLWYZLgJl3afd2qoWg5seRQ",
  authDomain: "event-web-voidd.firebaseapp.com",
  projectId: "event-web-voidd",
  storageBucket: "event-web-voidd.appspot.com",
  messagingSenderId: "482660025282",
  appId: "1:482660025282:web:c7933062122bd53dd9cc5b"
};

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)
