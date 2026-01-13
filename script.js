// 🔥 IMPORTS FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔹 CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyC2mDcpBykc8j62cWHZqG2PkwjVpRF09nc",
  authDomain: "kancheritos-3df2e.firebaseapp.com",
  projectId: "kancheritos-3df2e",
  storageBucket: "kancheritos-3df2e.firebasestorage.app",
  messagingSenderId: "407834805706",
  appId: "1:407834805706:web:3217b7fd2693a6d32c7b33"
};

// 🔹 INICIALIZAR
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 ELEMENTOS HTML
const login = document.getElementById("login");
const appDiv = document.getElementById("app");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const loginMsg = document.getElementById("loginMsg");

const email = document.getElementById("email");
const password = document.getElementById("password");

const codigo = document.getElementById("codigo");
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const proveedor = document.getElementById("proveedor");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");

// 🔐 LOGIN
btnLogin.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    loginMsg.textContent = "";
  } catch (err) {
    loginMsg.textContent = "❌ Email o contraseña incorrectos";
  }
});

// 🔓 LOGOUT
btnLogout.addEventListener("click", () => {
  signOut(auth);
});

// 👀 ESCUCHAR SESIÓN
onAuthStateChanged(auth, user => {
  if (user) {
    login.style.display = "none";
    appDiv.style.display = "block";
    cargarProductos();
  } else {
    login.style.display = "block";
    appDiv.style.display = "none";
  }
});

// ➕ AGREGAR PRODUCTO
btnAgregar.addEventListener("click", async () => {
  await addDoc(collection(db, "productos"), {
    codigo: codigo.value,
    nombre: nombre.value,
    precio: precio.value,
    proveedor: proveedor.value
  });

  codigo.value = "";
  nombre.value = "";
  precio.value = "";
  proveedor.value = "";
});

// 📦 MOSTRAR PRODUCTOS
function cargarProductos() {
  onSnapshot(collection(db, "productos"), snapshot => {
    lista.innerHTML = "";
    snapshot.forEach(doc => {
      const p = doc.data();
      lista.innerHTML += `<p><b>${p.nombre}</b> — ${p.precio} — ${p.proveedor}</p>`;
    });
  });
}
