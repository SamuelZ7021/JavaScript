
# 📦 Product Management Web App (`gestion_data.js`)

## 📑 Overview

This project is a simple web application for managing products (adding, updating, deleting, and viewing) using **pure JavaScript** on the frontend and **json-server** as a simulated backend (REST API).

The main file, `gestion_data.js`, contains all the logic for interacting with the API, validating data, and dynamically updating the user interface.

---

## 🚀 Main Features

- ✅ **View Products**: Displays all products stored in the database.
- ➕ **Add Product**: Allows adding a new product with a name and price.
- ✏️ **Update Product**: Modify the name and/or price of an existing product.
- ❌ **Delete Product**: Delete a product by its name.
- 🛡️ **Data Validation**: Prevents adding or modifying products with invalid data.
- 🔄 **Dynamic Interface**: Updates the product list in real-time after each operation.

---

## 🧩 Code Structure

### 1. Initialization and Event Listeners

- **DOMContentLoaded**: 
  - Calls `fetchProducts()`
  - Sets up button events for adding, updating, deleting, and showing/hiding forms.

### 2. Displaying Products

- **`fetchProducts()`**:
  - Fetches all products from the API (`/products`).
  - Clears the display container.
  - Creates a visual card for each product using `createProductCard(product)`.

- **`createProductCard(product)`**:
  - Dynamically creates a card with product name and price.
  - Adds the card to the main product container.

### 3. Adding a Product

- **`addProduct()`**:
  - Gets input values from name and price fields.
  - Validates data using `validateProduct(newProduct)`.
  - If valid, sends a `POST` request to the API.
  - Reloads the product list.

### 4. Updating a Product

- **`updateProduct()`**:
  - Gets current name, new name, and new price from inputs.
  - Validates inputs.
  - Searches for product by name (case-insensitive).
  - If found, sends a `PUT` request to update data.
  - Reloads the product list.

### 5. Deleting a Product

- **`deleteProduct()`**:
  - Gets product name from input.
  - Searches for the product by name.
  - If found, sends a `DELETE` request to the API.
  - Reloads the product list.

### 6. Product Validation

- **`validateProduct(product)`**:
  - Ensures name is a non-empty string.
  - Ensures price is a valid number.
  - If invalid, logs an error and cancels the operation.

---

## 🖥️ Example Workflow

### View Products:
- On page load, all products are listed.

### Add Product:
1. Enter name and price.
2. Click **"Add Product"**.
3. Product appears in the list (if valid).

### Update Product:
1. Click **"Display"** to show the update form.
2. Enter current name, new name, and price.
3. Click **"Update Product"**.
4. Product is updated in the list.

### Delete Product:
1. Enter product name.
2. Click **"Delete Product"**.
3. Product is removed from the list.

---

## 🛡️ Validations and Errors

- ❗ **Empty Name or Invalid Price**: 
  - Prevents add/update if data is invalid.
- ❌ **Product Not Found**:
  - Logs error if product doesn’t exist for update/delete.
- 🌐 **Network or API Errors**:
  - All `fetch` operations include error handling with console logs.

---

## 🗂️ Related Files

| File          | Description                          |
|---------------|--------------------------------------|
| `index.html`  | HTML structure of the application    |
| `style.css`   | Visual styling for the app           |
| `db.json`     | Simulated database for `json-server` |
| `gestion_data.js` | Main JavaScript application logic |

---

## 📦 Requirements

- [Node.js](https://nodejs.org/)
- [`json-server`](https://www.npmjs.com/package/json-server)

```bash
npm install -g json-server
json-server --watch db.json
```

Then open `index.html` in your browser.
