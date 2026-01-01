// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHQt3OjfOlbChL1iga1G0wQTTAFeeUKg0",
  authDomain: "portfolio-recup.firebaseapp.com",
  projectId: "portfolio-recup",
  storageBucket: "portfolio-recup.firebasestorage.app",
  messagingSenderId: "174144895892",
  appId: "1:174144895892:web:8330327628bc9de2ff2d81",
  measurementId: "G-HNNE2PH9CS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };

// Fonction pour incrémenter le compteur de visites
export const incrementVisitCount = async () => {
  try {
    const visitsRef = doc(db, "stats", "visits");
    const visitsDoc = await getDoc(visitsRef);

    if (visitsDoc.exists()) {
      await updateDoc(visitsRef, {
        count: increment(1),
        lastVisit: new Date().toISOString()
      });
      return visitsDoc.data().count + 1;
    } else {
      await setDoc(visitsRef, {
        count: 1,
        lastVisit: new Date().toISOString()
      });
      return 1;
    }
  } catch (error) {
    console.error("Error incrementing visit count:", error);
    return null;
  }
};

// Fonction pour récupérer le compteur de visites
export const getVisitCount = async () => {
  try {
    const visitsRef = doc(db, "stats", "visits");
    const visitsDoc = await getDoc(visitsRef);

    if (visitsDoc.exists()) {
      return visitsDoc.data().count;
    }
    return 0;
  } catch (error) {
    console.error("Error getting visit count:", error);
    return 0;
  }
};
