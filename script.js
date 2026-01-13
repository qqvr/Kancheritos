// 🔹 Firebase imports (MODULAR)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    doc, 
    setDoc, 
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// 🔹 TU CONFIG
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    measurementId: "TU_MEASUREMENT_ID"
};

// 🔹 Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Elementos
const loginDiv = document.getElementById("login");
const appDiv = document.getElementById("app");
const lista = document.getElementById("lista");

// 🔹 LOGIN
document.getElementById("btnLogin").onclick = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .catch(err => loginMsg.textContent = err.message);
};

// 🔹 LOGOUT
document.getElementById("btnLogout").onclick = () => {
    signOut(auth);
};

// 🔹 Detectar sesión
onAuthStateChanged(auth, user => {
    if (user) {
        loginDiv.style.display = "none";
        appDiv.style.display = "grid";
        cargarProductos();
    } else {
        loginDiv.style.display = "block";
        appDiv.style.display = "none";
    }
});

// 🔹 AGREGAR PRODUCTO
document.getElementById("btnAgregar").onclick = async () => {
    await setDoc(doc(db, "productos", codigo.value), {
        nombre: nombre.value,
        precio: precio.value,
        proveedor: proveedor.value
    });

    // limpiar inputs
    codigo.value = "";
    nombre.value = "";
    precio.value = "";
    proveedor.value = "";
};

// 🔹 CARGAR PRODUCTOS EN TIEMPO REAL
function cargarProductos() {
    onSnapshot(collection(db, "productos"), snapshot => {
        lista.innerHTML = "";
        snapshot.forEach(doc => {
            const p = doc.data();
            lista.innerHTML += `
                <p><b>${p.nombre}</b> — ${p.precio} — ${p.proveedor}</p>
            `;
        });
    });
}
