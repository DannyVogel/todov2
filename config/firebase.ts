// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  child,
  update,
  remove,
  onValue,
} from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User,
} from "firebase/auth";
import firebase from "firebase/compat/app";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDoHCvnEp05kccORzZIsY4nCkxWgxGYRg8",
  authDomain: "todolist-396ab.firebaseapp.com",
  databaseURL:
    "https://todolist-396ab-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolist-396ab",
  storageBucket: "todolist-396ab.appspot.com",
  messagingSenderId: "686242007209",
  appId: "1:686242007209:web:353d4f82c65d7799b881b8",
};
import { getMessaging, getToken } from "firebase/messaging";
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const auth = getAuth(app);
const database = getDatabase(app);
const toDoDB = ref(database, "toDoApp");
const messaging = getMessaging(app);
getToken(messaging, {
  vapidKey:
    "BMoPeNQv9kynnfiBXdOro0On-xjGRb9IvLyXMBz3hR70lOgWoUOUW9AcD5N5IOHQ9MJ2XGm4RrIKajlB_r9PPdw",
});

export {
  database,
  ref,
  get,
  child,
  update,
  remove,
  onValue,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  toDoDB,
};
export type { User };
