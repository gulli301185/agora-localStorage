import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_OXqol0asH7AlHmFlla-GPBUrf93fvJE",
  authDomain: "example-1f03b.firebaseapp.com",
  projectId: "example-1f03b",
  storageBucket: "example-1f03b.appspot.com",
  messagingSenderId: "524061288790",
  appId: "1:524061288790:web:7e0047cff943e4c1284ef7",
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
