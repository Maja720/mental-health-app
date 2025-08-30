import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCoK99o_ALWtLs_6wPwRy3wlEPxxtaqlVA',
  authDomain: 'mental-health-fd3f3.firebaseapp.com',
  projectId: 'mental-health-fd3f3',
  storageBucket: 'mental-health-fd3f3.appspot.com',
  messagingSenderId: '944056698915',
  appId: '1:944056698915:web:b9c339d6a893b635f50996',
  measurementId: 'G-SGLHM1KDDS',
};

const app = initializeApp(firebaseConfig);

// named exports
export const auth = getAuth(app);
export const db = getFirestore(app);

// default (ako nekom treba app)
export default app;
