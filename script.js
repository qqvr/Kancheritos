// 🔥 FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyC2mDcpBykc8j62cWHZqG2PkwjVpRF09nc",
  authDomain: "kancheritos-3df2e.firebaseapp.com",
  projectId: "kancheritos-3df2e",
  storageBucket: "kancheritos-3df2e.firebasestorage.app",
  messagingSenderId: "407834805706",
  appId: "1:407834805706:web:3217b7fd2693a6d32c7b33"
};

// 🔹 INIT
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 ELEMENTOS
const login = document.getElementById("login");
const appDiv = document.getElementById("app");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const loginMsg = document.getElementById("loginMsg");

const email = document.getElementById("email");
const password = document.getElementById("password");

const buscar = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

const codigo = document.getElementById("codigo");
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const proveedor = document.getElementById("proveedor");
const btnAgregar = document.getElementById("btnAgregar");

// 🔐 LOGIN
btnLogin.onclick = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    loginMsg.textContent = "";
  } catch (e) {
    loginMsg.textContent = "❌ Email o contraseña incorrectos";
  }
};

// 🔓 LOGOUT
btnLogout.onclick = () => signOut(auth);

// 👀 SESIÓN
onAuthStateChanged(auth, user => {
  if (user) {
    login.style.display = "none";
    appDiv.style.display = "flex";
  } else {
    login.style.display = "block";
    appDiv.style.display = "none";
  }
});

// ➕ GUARDAR PRODUCTO (NO MUESTRA NADA)
btnAgregar.onclick = async () => {
  await addDoc(collection(db, "productos"), {
    codigo: codigo.value,
    nombre: nombre.value,
    precio: precio.value,
    proveedor: proveedor.value
  });

  codigo.value = nombre.value = precio.value = proveedor.value = "";
  alert("Producto guardado ✅");
};

// 🔍 BUSCAR SOLO CUANDO LO PEDÍS
buscar.oninput = async () => {
  const text = buscar.value.toLowerCase();
  resultado.innerHTML = "";

  if (!text) return;

  const snap = await getDocs(collection(db, "productos"));

  snap.forEach(doc => {
    const p = doc.data();
    if (
      p.nombre.toLowerCase().includes(text) ||
      p.codigo.toLowerCase().includes(text)
    ) {
      resultado.innerHTML += `
        <div>
          <b>${p.nombre}</b><br>
          Código: ${p.codigo}<br>
          Precio: ${p.precio}<br>
          Proveedor: ${p.proveedor}
        </div>
      `;
    }
  });
};
