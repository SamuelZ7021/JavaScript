# 🗂️ Data Management System – README

This project is a lightweight web application built with **HTML**, **CSS**, and **JavaScript**, designed to demonstrate basic data entry, manipulation, and presentation in the browser without the need for a backend or external libraries.

It serves as a foundation for understanding how to:
- Create user interfaces with form inputs.
- Capture and validate user input.
- Dynamically update the DOM (Document Object Model).
- Apply styles for better user experience.

---

## 📁 Project Structure

### 1. `index.html`
This is the main HTML file that renders the structure and layout of the webpage.

#### Contains:
- A `form-like` section with inputs for:
  - `Product ID`: A unique identifier for each product.
  - `Product Name`: A short text name for the product.
  - `Product Price`: A number representing the price.
- A button labeled **"Add Product"** which, when clicked, captures the values from the inputs and triggers a JavaScript function to handle the data.
- Three main display sections:
  - `#productList`: Shows all products added by the user.
  - `#uniqueProducts`: Displays a filtered view with only unique products.
  - `#categories`: Can be used to display grouped or categorized data.

It also includes the stylesheet `style.css` and the script `gestion_datos.js`.

---

### 2. `style.css`
This file contains all the visual styling for the application.

#### Main styling highlights:
- The page is centered using CSS Grid.
- `.container` class provides padding, background color, border radius, and a shadow for a clean card-like interface.
- Inputs are styled for better usability:
  - Responsive width
  - Padding for spacing inside the fields
  - Rounded borders for a modern look
- Buttons are styled in green (`#28a745`) with hover effects (`#218838`) to enhance interactivity.
- Sections like `#productList`, `#uniqueProducts`, and `#categories` are spaced using `margin-bottom`.

This results in a clean, simple, and professional UI.

---

### 3. `gestion_datos.js`
This JavaScript file handles all data logic and interaction with the HTML.

#### Key functionalities:
- **Event Listener for the Add Button**: Captures product data entered by the user.
- **Product Validation**: Can be extended to check if the product ID is unique or fields are not empty.
- **Dynamic DOM Manipulation**: Updates the HTML content dynamically by inserting new product entries into the appropriate divs.
- **Product Deduplication**: Handles logic to ensure unique product entries are displayed.
- **Categorization**: (Optional) Can classify products into different groups or price ranges.
---

## 🚀 How to Run This Project

1. **Download or Clone** the repository or project files.
2. **Open** the file `index.html` using any modern web browser.
3. **Use the interface**:
   - Enter product information.
   - Click the **Add Product** button.
   - The product will appear in the list below.
