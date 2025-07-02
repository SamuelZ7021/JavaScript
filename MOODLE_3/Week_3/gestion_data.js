// function validarProduct(product){
//     if (!product.nombre || typeof product.price !== "number"){
//         console.error("Datos del producto no válidos.")
//         return false;
//     }
//     return true;
// }

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    document.getElementById('btn-toggle-update').addEventListener('click', () => {
        const form = document.getElementById('update-form');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('btn-cancel-update').addEventListener('click', () => {
        document.getElementById('update-form').style.display = 'none';
    });

    document.getElementById('addProduct').addEventListener('click', (e) => {
        e.preventDefault();
        addProduct();
    });

    document.getElementById('btn-update').addEventListener('click', (e) => {
        e.preventDefault();
        updateProduct();
    });

    document.getElementById('btn-delete').addEventListener('click', (e) => {
        e.preventDefault();
        deleteProduct();
    });
});

function fetchProducts() {
    fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(data => {
        const container = document.getElementById('product-container');
        container.innerHTML = '';
        data.forEach(product => {
            createProductCard(product);
    });
    })
    .catch(error => console.error("Error al obtener productos", error));
}

function createProductCard(product) {
    const container = document.getElementById('product-container');
    const card = document.createElement('div');

    card.classList.add('product-card');

    card.innerHTML = `<h4>${product.nombre}</h4><p>Precio: $${product.price}</p>`;
    container.appendChild(card);
};

function addProduct() {
    const nombre = document.getElementById('nombre').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const newProduct = { nombre, price };

    if (!validarProduct(newProduct)) return;

    fetch('http://localhost:3000/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
    })
        .then(res => {
        if (!res.ok) throw new Error("Error al agregar producto");
        return res.json();
    })
        .then(() => {
        fetchProducts();
    })
    .catch(error => console.error(error));
};


function updateProduct() {
    const nombreActual = document.getElementById('update-nombre').value.trim().toLowerCase();
    const nuevoNombre = document.getElementById('nuevo-nombre').value.trim();
    const newPrice = parseFloat(document.getElementById('update-price').value);

    if (!nombreActual || nuevoNombre === '' || isNaN(newPrice)) {
        console.error("Datos inválidos para actualizar");
        return;
    }

// Primero obtener todos los productos
fetch('http://localhost:3000/products')
    .then(res => res.json())
    .then(products => {
        const product = products.find(p => p.nombre.trim().toLowerCase() === nombreActual);
        console.log("Producto encontrado:", product);

        if (!product) throw new Error("Producto no encontrado");

        const updatedProduct = { ...product, nombre: nuevoNombre, price: newPrice };

        return fetch(`http://localhost:3000/products/${product.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        });
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al actualizar producto");
        return res.json();
    })
    .then(() => {
        console.log("Producto actualizado correctamente");
        fetchProducts();
    })
    .catch(error => console.error("Error:", error.message));
};



function deleteProduct() {
    const nombre = document.getElementById('delete-nombre').value.trim().toLowerCase();

    if (!nombre) {
        console.error("Nombre inválido para eliminar");
        return;
    }

    fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(products => {
        const product = products.find(p => p.nombre.trim().toLowerCase() === nombre);
        if (!product) throw new Error("Producto no encontrado");

        return fetch(`http://localhost:3000/products/${product.id}`, {
            method: 'DELETE'
        });
    })
        .then(res => {
        if (!res.ok) throw new Error("No se pudo eliminar");
        console.log("Producto eliminado");
        fetchProducts();
    })
    .catch(error => console.error("Error:", error.message));
};


function validarProduct(product) {
    if (
        typeof product.nombre !== "string" || product.nombre.trim() === "" ||
        typeof product.price !== "number" || isNaN(product.price)
    ) {
    console.error("Producto inválido:", product);
    return false;
    }
    return true;
};
