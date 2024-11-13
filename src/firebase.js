// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDh3NOdF0T8FIrlk_FU5cZIg45_rGx8Xzo',
  authDomain: 'myfoodaudi.firebaseapp.com',
  projectId: 'myfoodaudi',
  storageBucket: 'myfoodaudi.appspot.com',
  messagingSenderId: '1083736994291',
  appId: '1:1083736994291:web:b4623cf824e3b0dd882286',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
