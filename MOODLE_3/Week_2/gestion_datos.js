// Alert introduction to the data management.
alert("Welcome to the data management system!")
console.log("Welcome to the data management system!")

const products = {
    1: { id: 1, nombre: "Laptop", price: 1500},
    2: { id: 2, nombre: "Mouse", price: 500},
    3: { id: 3, nombre: "Teclado", price: 250}
};

console.log("objeto productos:", products);

//Create Set for delete duplicate products
const setProducts = new Set(Object.values(products).map(product => product.nombre));
console.log("Set de productos unicos:", setProducts);

//Create Map for add categores and products
const mapProducts = new Map([
    ["Elctronica", "Laptop"],
    ["Accesorios", "Mouse"],
    ["Accesorios", "Teclado"]
]);
console.log("Map de productos y categorias:", mapProducts);

//Browse the products object
for (const id in products){
    console.log(`Productos ID: ${id}, Detalles:`, products[id]);
}

//Browse the product set
for (const product of setProducts){
    console.log("Productos unicos:", product);
}

//Browse the products map
mapProducts.forEach((product, categoria) => {
    console.log(`categoria: ${categoria}, producto: ${product}`);
});

console.log("Pruebas completas de gestion de datos:");
console.log("Lista de productos (Objeto):", products);
console.log("Lista de productos unicos (Set):", setProducts);
console.log("Categotia y productos (Map):", mapProducts);



// This part the code is optional because I want a function to be able to place some extra products
    const productList = document.getElementById('productList');
    const uniqueProducts = document.getElementById('uniqueProducts');
    const categories = document.getElementById('categories');
    const addProduct = document.getElementById('addProduct');


//Some functions to display in HTML and add products
    function displayProducts() {
        productList.innerHTML = '<h2>Product List</h2>';
        for (const id in products) {
            const product = products[id];
            productList.innerHTML += `<p>ID: ${product.id}, Nombre: ${product.nombre}, Precio: $${product.price}</p>`;
        }
    };  

    function displayUniqueProducts() {
        uniqueProducts.innerHTML = '<h2>Unique Products</h2>';
        for (const product of setProducts) {
            uniqueProducts.innerHTML += `<p>${product}</p>`;
        }
    }

    function displayCategories() {
        categories.innerHTML = '<h2>Categories and Products</h2>';
        mapProducts.forEach((product, categoria) => {
            categories.innerHTML +=`<p>Categoria: ${categoria}, Producto: ${product}</p>`;
        });
    };

//A click for add products
    addProduct.addEventListener('click', () => {
        const productId = document.getElementById('productId').value.trim();
        const productName = document.getElementById('productName').value.trim();
        const productPrice = document.getElementById('productPrice').value.trim();

//requirements so that you do not misplace what you requested
        if (!productId || !productName || !productPrice) {
            alert('Please fill in all fields');
            return;
        }

//Continue with the code
        const newProduct = { id: parseInt(productId), nombre: productName, price: parseFloat(productPrice) };
        products[newProduct.id] = newProduct;

        setProducts.add(newProduct.nombre);
        mapProducts.set("Accesorios", newProduct.nombre);

        displayProducts();
        displayUniqueProducts();
        displayCategories();
    });

displayProducts();
displayUniqueProducts();
displayCategories();


document.getElementById('productId').value = '';
document.getElementById('productName').value = '';
document.getElementById('productPrice').value = '';
