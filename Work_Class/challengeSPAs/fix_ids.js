const fs = require('fs');

// Lee el archivo users.json
const data = JSON.parse(fs.readFileSync('users.json', 'utf8'));

// Ordena los usuarios por id numérico (por si acaso)
data.users.sort((a, b) => Number(a.id) - Number(b.id));

// Asigna IDs secuenciales numéricos empezando desde 1
data.users.forEach((user, idx) => {
    user.id = idx + 1;
});

// Guarda el archivo con los IDs corregidos
fs.writeFileSync('users.json', JSON.stringify(data, null, 2));

console.log('IDs corregidos y secuenciales en users.json');