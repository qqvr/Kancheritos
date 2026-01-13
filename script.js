// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2mDcpBykc8j62cWHZqG2PkwjVpRF09nc",
  authDomain: "kancheritos-3df2e.firebaseapp.com",
  projectId: "kancheritos-3df2e",
  storageBucket: "kancheritos-3df2e.firebasestorage.app",
  messagingSenderId: "407834805706",
  appId: "1:407834805706:web:3217b7fd2693a6d32c7b33",
  measurementId: "G-JVE250G0GF"
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
