import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEElzkzPiWoqzu8TCROUurZkFQaXxuxyI",
  authDomain: "multitool-52ebf.firebaseapp.com",
  projectId: "multitool-52ebf",
  storageBucket: "multitool-52ebf.appspot.com",
  messagingSenderId: "851639951476",
  appId: "1:851639951476:web:cd17dad9906f0bf78f3121",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
