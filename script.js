// 🔥 Firebase imports
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
  query,
  where,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 TU CONFIGURACIÓN DE FIREBASE
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// 🔥 Inicializar Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

// 🧱 ELEMENTOS HTML
const loginDiv = document.getElementById("login");
const appDiv = document.getElementById("app");

const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginMsg = document.getElementById("loginMsg");

// 👀 ESCUCHAR ESTADO DE SESIÓN
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ✅ Usuario logueado
    loginDiv.style.display = "none";
    appDiv.style.display = "flex";
  } else {
    // ❌ No logueado
    loginDiv.style.display = "block";
    appDiv.style.display = "none";
  }
});

// 🔐 LOGIN
btnLogin.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    loginMsg.innerText = "Completá email y contraseña";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginMsg.innerText = "";
    })
    .catch(() => {
      loginMsg.innerText = "Email o contraseña incorrectos";
    });
});

// 🔓 LOGOUT
btnLogout.addEventListener("click", () => {
  signOut(auth);
});

// ===============================
// 🛒 PRODUCTOS
// ===============================

const buscarInput = document.getElementById("buscar");
const resultadoDiv = document.getElementById("resultado");

const codigoInput = document.getElementById("codigo");
const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const proveedorInput = document.getElementById("proveedor");

const btnAgregar = document.getElementById("btnAgregar");

// ➕ AGREGAR PRODUCTO
btnAgregar.addEventListener("click", async () => {
  const codigo = codigoInput.value.trim();
  const nombre = nombreInput.value.trim();
  const precio = precioInput.value.trim();
  const proveedor = proveedorInput.value.trim();

  if (!codigo || !nombre || !precio || !proveedor) {
    alert("Completá todos los campos");
    return;
  }

  await addDoc(collection(db, "productos"), {
    codigo,
    nombre,
    precio,
    proveedor
  });

  codigoInput.value = "";
  nombreInput.value = "";
  precioInput.value = "";
  proveedorInput.value = "";

  alert("Producto guardado");
});

// 🔍 BUSCAR SOLO POR CÓDIGO
buscarInput.addEventListener("input", async () => {
  const codigo = buscarInput.value.trim();
  resultadoDiv.innerHTML = "";

  if (!codigo) return;

  const q = query(
    collection(db, "productos"),
    where("codigo", "==", codigo)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const p = docSnap.data();

    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${p.nombre}</strong><br>
      Código: ${p.codigo}<br>
      Precio: ${p.precio}<br>
      Proveedor: ${p.proveedor}<br>
      <button data-id="${docSnap.id}">Eliminar</button>
    `;

    div.querySelector("button").addEventListener("click", async () => {
      await deleteDoc(doc(db, "productos", docSnap.id));
      div.remove();
    });

    resultadoDiv.appendChild(div);
  });
});
