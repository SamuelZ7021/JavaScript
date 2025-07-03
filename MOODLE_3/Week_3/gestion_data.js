document.addEventListener('DOMContentLoaded', () => {
    fetchProducts(); // Load and display products on page load

    // Show or hide the update form when the toggle button is clicked
    document.getElementById('btn-toggle-update').addEventListener('click', () => {
        const form = document.getElementById('update-form');
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    });

    // Hide the update form when the cancel button is clicked
    document.getElementById('btn-cancel-update').addEventListener('click', () => {
        document.getElementById('update-form').style.display = 'none';
    });

    // Add product event
    document.getElementById('addProduct').addEventListener('click', (e) => {
        e.preventDefault();
        addProduct();
    });

    // Update product event
    document.getElementById('btn-update').addEventListener('click', (e) => {
        e.preventDefault();
        updateProduct();
    });

    // Delete product event
    document.getElementById('btn-delete').addEventListener('click', (e) => {
        e.preventDefault();
        deleteProduct();
    });
});

// Fetch all products from the backend and display them
function fetchProducts() {
    fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('product-container');
            container.innerHTML = '';
            data.forEach(product => {
                createProductCard(product); // Create a card for each product
            });
        })
        .catch(error => console.error("Error fetching products", error));
}

// Create and append a visual card for a product in the main container
function createProductCard(product) {
    const container = document.getElementById('product-container');
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `<h4>${product.nombre}</h4><p>Precio: $${product.price}</p>`;
    container.appendChild(card);
};

// Add a new product to the backend if the data is valid
function addProduct() {
    const nombre = document.getElementById('nombre').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const newProduct = { nombre, price };

    // Validate product data before sending
    if (!validarProduct(newProduct)) return;

    fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
    })
        .then(res => {
            if (!res.ok) throw new Error("Error adding product");
            return res.json();
        })
        .then(() => {
            fetchProducts(); // Reload the product list
        })
        .catch(error => console.error(error));
};

// Update an existing product by searching for its current name
function updateProduct() {
    const nombreActual = document.getElementById('update-nombre').value.trim().toLowerCase();
    const nuevoNombre = document.getElementById('nuevo-nombre').value.trim();
    const newPrice = parseFloat(document.getElementById('update-price').value);

    // Validate input data
    if (!nombreActual || nuevoNombre === '' || isNaN(newPrice)) {
        console.error("Invalid data for update");
        return;
    }

    // Fetch all products, find the one to update, and send the update request
    fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p.nombre.trim().toLowerCase() === nombreActual);
            console.log("Product found:", product);

            if (!product) throw new Error("Product not found");

            const updatedProduct = { ...product, nombre: nuevoNombre, price: newPrice };

            return fetch(`http://localhost:3000/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct)
            });
        })
        .then(res => {
            if (!res.ok) throw new Error("Error updating product");
            return res.json();
        })
        .then(() => {
            console.log("Product updated successfully");
            fetchProducts(); // Reload the product list
        })
        .catch(error => console.error("Error:", error.message));
};

// Delete an existing product by searching for its name
function deleteProduct() {
    const nombre = document.getElementById('delete-nombre').value.trim().toLowerCase();

    // Validate the name before searching
    if (!nombre) {
        console.error("Invalid name for deletion");
        return;
    }

    // Fetch all products, find the one to delete, and send the delete request
    fetch('http://localhost:3000/products')
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p.nombre.trim().toLowerCase() === nombre);
            if (!product) throw new Error("Product not found");

            return fetch(`http://localhost:3000/products/${product.id}`, {
                method: 'DELETE'
            });
        })
        .then(res => {
            if (!res.ok) throw new Error("Could not delete product");
            console.log("Product deleted");
            fetchProducts(); // Reload the product list
        })
        .catch(error => console.error("Error:", error.message));
};

// Validate that the product has a non-empty name and a valid price
function validarProduct(product) {
    if (
        typeof product.nombre !== "string" || product.nombre.trim() === "" ||
        typeof product.price !== "number" || isNaN(product.price)
    ) {
        console.error("Invalid product:", product);
        return false;
    }
    return true;
};
