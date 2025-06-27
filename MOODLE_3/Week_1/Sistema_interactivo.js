alert("Bienvenid@ al programa de validacion!")

let nombre = prompt("Ingresa tu nomnbre")
let edad = parseInt(prompt("Ingresa tu edad"))

if( edad >= 18 && edad <= 100){
    alert(`Hola ${nombre} eres mayor de edad, todavia hay mas cosas que aprender ¡SIEMPRE CON LA MEJOR ACTITUD!`)
    console.log(`Hola ${nombre} eres mayor de edad, todavia hay mas cosas que aprender ¡SIEMPRE CON LA MEJOR ACTITUD!`)
} else if ( edad <= 18 && edad >= 0){
    alert(`Hola ${nombre} eres menor de edad, aun te queda mucho camino por recorrer ¡DALE CON TODA!`)
    console.log(`Hola ${nombre} eres menor de edad, aun te queda mucho camino por recorrer ¡DALE CON TODA!`)
} else {
    alert("Por favor, complete todos los campos correctamente.")
    console.error("Por favor, complete todos los campos correctamente.")
}