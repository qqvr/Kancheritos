import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2mDcpBykc8j62cWHZqG2PkwjVpRF09nc",
  authDomain: "kancheritos-3df2e.firebaseapp.com",
  projectId: "kancheritos-3df2e",
  storageBucket: "kancheritos-3df2e.firebasestorage.app",
  messagingSenderId: "407834805706",
  appId: "1:407834805706:web:3217b7fd2693a6d32c7b33"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const btnLogin = document.getElementById("btnLogin");
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginMsg = document.getElementById("loginMsg");

btnLogin.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    loginMsg.textContent = "LOGIN OK ✅";
  } catch (e) {
    loginMsg.textContent = e.code;
    console.error(e);
  }
};
