// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as credenciales from "../secrets/credenciales";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: credenciales.apiKey,
  authDomain: credenciales.authDomain,
  databaseURL: credenciales.databaseURL,
  projectId: credenciales.projectId,
  storageBucket: credenciales.storageBucket,
  messagingSenderId: credenciales.messagingSenderId,
  appId: credenciales.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();