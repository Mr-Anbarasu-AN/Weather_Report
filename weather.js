const apiKey = "b7ed148c145481b07f0c098fec47a0ec";
const main = document.getElementById('main');
const form = document.getElementById('form');
const loc = document.getElementById('city');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {     
    try {
        const resp = await fetch(url(city));
        const respData = await resp.json();

        if (respData.cod === "404" || respData.cod === "400") {
            throw new Error(respData.message);
        }
        
        addWeatherToPage(respData);
    } catch (error) {
        displayError(error.message);
    }
}

function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C 
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
    `;
    // cleanup 
    main.innerHTML = "";
    main.appendChild(weather);
}

function displayError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    errorDiv.textContent = `Error: ${message}`;
    // cleanup 
    main.innerHTML = "";
    main.appendChild(errorDiv);
}

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = loc.value;

    if (city) {
        getWeatherByLocation(city);
    }
});
