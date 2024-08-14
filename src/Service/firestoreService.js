import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const saveHabits = async (habits) => {
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    try {
      await setDoc(doc(db, "users", userId), { habits });
    } catch (error) {
      console.error("Error saving habits:", error.message);
    }
  } else {
    console.error("No user is currently authenticated.");
  }
};

const getHabits = async () => {
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    try {
      const docSnap = await getDoc(doc(db, "users", userId));
      return docSnap.exists() ? docSnap.data().habits : [];
    } catch (error) {
      console.error("Error retrieving habits:", error.message);
      return [];
    }
  } else {
    console.error("No user is currently authenticated.");
    return [];
  }
};

export { saveHabits, getHabits };
