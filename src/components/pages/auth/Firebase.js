import { initializeApp } from "firebase/app";
import {getAuth , RecaptchaVerifier} from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyDDQSIPDECt9fwPSWYwvXO_6V4CI-tsLNg",
  authDomain: "writo-525e8.firebaseapp.com",
  databaseURL: "https://writo-525e8-default-rtdb.firebaseio.com",
  projectId: "writo-525e8",
  storageBucket: "writo-525e8.appspot.com",
  messagingSenderId: "38396057848",
  appId: "1:38396057848:web:c3f76e6fa268d3cf0d830d"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const dbFireStore = getFirestore(app);

 const storage = getStorage(app)

export {app,auth,dbFireStore,storage};