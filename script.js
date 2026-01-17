// Firebase config (dejá el tuyo real)
const firebaseConfig = {
  apiKey: "AIzaSyC2mDcpBykc8j62cWHZqG2PkwjVpRF09nc",
  authDomain: "kancheritos-3df2e.firebaseapp.com",
  projectId: "kancheritos-3df2e",
  storageBucket: "kancheritos-3df2e.firebasestorage.app",
  messagingSenderId: "407834805706",
  appId: "1:407834805706:web:3217b7fd2693a6d32c7b33",
  measurementId: "G-JVE250G0GF"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const app = document.getElementById("app");
const loginBox = document.getElementById("loginBox");
const productCard = document.getElementById("productCard");

function login() {
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      loginBox.style.display = "none";
      app.classList.remove("hidden");
    })
    .catch(() => {
      alert("Email o contraseña incorrectos");
    });
}

function agregarProducto() {
  const code = document.getElementById("code").value;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const provider = document.getElementById("provider").value;

  db.collection("products").doc(code).set({
    name,
    price,
    provider
  });

  alert("Producto agregado");
}

function buscarProducto() {
  const code = document.getElementById("searchCode").value;

  db.collection("products").doc(code).get().then(doc => {
    if (!doc.exists) {
      alert("No existe");
      return;
    }

    const p = doc.data();

    productCard.innerHTML = `
      <p><strong>Código:</strong> ${code}</p>
      <p><strong>Nombre:</strong> ${p.name}</p>
      <p><strong>Precio:</strong> $${p.price}</p>
      <p><strong>Proveedor:</strong> ${p.provider}</p>

      <div class="actions">
        <button onclick="editarProducto('${code}')">Modificar</button>
        <button class="delete" onclick="eliminarProducto('${code}')">Eliminar</button>
      </div>
    `;

    productCard.classList.remove("hidden");
  });
}

function editarProducto(code) {
  db.collection("products").doc(code).get().then(doc => {
    const p = doc.data();

    productCard.innerHTML = `
      <p><strong>Código:</strong> ${code}</p>
      <p><strong>Nombre:</strong> ${p.name}</p>

      <label>Precio →</label>
      <input type="number" id="editPrice" value="${p.price}">

      <label>Proveedor →</label>
      <input type="text" id="editProvider" value="${p.provider}">

      <div class="actions">
        <button onclick="guardarCambios('${code}')">Guardar</button>
        <button class="delete" onclick="buscarProducto()">Cancelar</button>
      </div>
    `;
  });
}

function guardarCambios(code) {
  const price = document.getElementById("editPrice").value;
  const provider = document.getElementById("editProvider").value;

  db.collection("products").doc(code).update({
    price,
    provider
  });

  buscarProducto();
}

function eliminarProducto(code) {
  if (!confirm("¿Eliminar producto?")) return;

  db.collection("products").doc(code).delete();
  productCard.classList.add("hidden");
}
