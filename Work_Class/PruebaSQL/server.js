const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const fs = require("fs");
const multer = require("multer");
const csv = require("csv-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const upload = multer({ dest: "uploads/" });

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

// 📌 OBTENER TODOS LOS PRODUCTOS
app.get("/productos", (req, res) => {
    db.query("SELECT * FROM productos", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// 📌 CREAR PRODUCTO
app.post("/productos", (req, res) => {
    const { nombre, precio } = req.body;
    db.query(
        "INSERT INTO productos (nombre, precio) VALUES (?, ?)",
        [nombre, precio],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ id: result.insertId, nombre, precio });
        }
    );
});

// 📌 ACTUALIZAR PRODUCTO
app.put("/productos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    db.query(
        "UPDATE productos SET nombre = ?, precio = ? WHERE id = ?",
        [nombre, precio, id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Producto actualizado" });
        }
    );
});

// 📌 ELIMINAR PRODUCTO
app.delete("/productos/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM productos WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Producto eliminado" });
    });
});

// 📌 SUBIR Y PROCESAR ARCHIVO CSV/TXT
app.post("/upload", upload.single("archivo"), (req, res) => {
    const filePath = req.file.path;
    const extension = req.file.originalname.split(".").pop().toLowerCase();

    if (extension === "csv") {
        let productos = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                if (row.nombre && row.precio) {
                    productos.push([row.nombre.trim(), parseFloat(row.precio)]);
                }
            })
            .on("end", () => {
                if (productos.length === 0) {
                    return res.status(400).json({ error: "CSV vacío o formato incorrecto" });
                }
                db.query(
                    "INSERT INTO productos (nombre, precio) VALUES ?",
                    [productos],
                    (err) => {
                        if (err) return res.status(500).json({ error: err });
                        res.json({ message: "CSV importado con éxito" });
                    }
                );
            });

    } else if (extension === "txt") {
        const data = fs.readFileSync(filePath, "utf8").split("\n");
        const productos = data
            .filter(line => line.trim() !== "")
            .map(line => {
                const [nombre, precio] = line.split(",");
                return [nombre.trim(), parseFloat(precio)];
            })
            .filter(p => p[0] && !isNaN(p[1]));

        if (productos.length === 0) {
            return res.status(400).json({ error: "TXT vacío o formato incorrecto" });
        }

        db.query(
            "INSERT INTO productos (nombre, precio) VALUES ?",
            [productos],
            (err) => {
                if (err) return res.status(500).json({ error: err });
                res.json({ message: "TXT importado con éxito" });
            }
        );

    } else {
        return res.status(400).json({ error: "Formato no soportado" });
    }
});

// 📌 INICIAR SERVIDOR
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
