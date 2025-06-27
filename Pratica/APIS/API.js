
const apiKey = "033c8bad2f9045530c18baf9ed570a15";


console.log(process.env.MI_API_KEY)

function checkEnter(event) {
    if (event.key === "Enter") {
        getWeather();
    }
}

async function getWeather() {

    const cityInput = document.getElementById("city-input");
    const city = cityInput ? cityInput.value.trim() : "";

    const resultDiv = document.getElementById("result");

if (!city) {
    resultDiv.innerText = "Por favor ingresa una ciudad.";
    return;
}

try {
    resultDiv.innerText = "Buscando...";

    const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`
    );

    if (!response.ok) throw new Error("Ciudad no encontrada.");

    const data = await response.json();
    const { name, main, weather } = data;

    console.log(data.sys.sunset);

    resultDiv.innerHTML = `
    <p><strong>Ciudad:</strong> ${name}</p>
    <p><strong>Temperatura:</strong> ${main.temp}°C</p>
    <p><strong>Clima:</strong> ${weather[0].description}</p>
    `;
} catch (error) {
    console.log(error);
    resultDiv.innerText = error.message;
}
}

// Falta agregar otro boton
