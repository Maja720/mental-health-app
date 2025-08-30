import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import firebaseConfig from './firebaseConfig';
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addUserToFirestore = async (userId, userData) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData);
    console.log("Podaci korisnika su dodati!");
  } catch (error) {
    console.error("Greška pri dodavanju podataka: ", error.message);
    throw error;
  }
};

export const getUsersFromFirestore = async () => {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map(doc => doc.data());
  return usersList;
};

export { db, collection, getDocs, addDoc };
