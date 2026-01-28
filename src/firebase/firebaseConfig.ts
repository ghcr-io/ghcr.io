import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0ubx-bCPSEJxsQAM8-gOAZchaxquhRtI",
  authDomain: "web4-86e33.firebaseapp.com",
  projectId: "web4-86e33",
  storageBucket: "web4-86e33.firebasestorage.app",
  messagingSenderId: "641940543035",
  appId: "1:641940543035:web:6596dc15d2c2c913d1ee1e",
  measurementId: "G-S8TKPZXH47"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /uploads/{userId}/{fileName} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
