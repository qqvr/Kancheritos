// 🔥 IMPORTS FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyC2mDcpBykc8j62cWHZqG2PkwjVpRF09nc",
  authDomain: "kancheritos-3df2e.firebaseapp.com",
  projectId: "kancheritos-3df2e",
  storageBuc
