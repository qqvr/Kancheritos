const productos = {
    1000: {
        nombre: "Nombre",
        precio: "$",
        proveedor: "Proveedor A"
    },
    1001: {
        nombre: "Nombre",
        precio: "$",
        proveedor: "Proveedor B"
    },
    1002: {
        nombre: "Nombre",
        precio: "$",
        proveedor: "Proveedor C"
    },
    1003: {
        nombre: "Nombre",
        precio: "$",
        proveedor: "Proveedor A"
    },
    1005: {
        nombre: "Nombre",
        precio: "$",
        proveedor: "Proveedor A"
    }
};

function buscarProducto() {
    const codigo = document.getElementById("codigo").value;
    const resultado = document.getElementById("resultado");

    if (productos[codigo]) {
        const p = productos[codigo];
        resultado.innerHTML = `
            <strong>${p.nombre}</strong><br>
            Precio: ${p.precio}<br>
            Proveedor: ${p.proveedor}
        `;
    } else {
        resultado.innerHTML = "❌ Código no encontrado";
    }
}
