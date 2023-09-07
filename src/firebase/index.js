import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { LocalStorage } from "quasar";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "quick-notes-79781.firebaseapp.com",
  projectId: "quick-notes-79781",
  storageBucket: "quick-notes-79781.appspot.com",
  messagingSenderId: "670436742519",
  appId: "1:670436742519:web:6f7ed19488de632d8a7d72",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    LocalStorage.set("user", user);
  } else {
    LocalStorage.remove("user");
  }
});
