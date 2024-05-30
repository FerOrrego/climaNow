const api = {
    key: '51f45238d65c53a7432991be89a284b2',
    url: 'https://api.openweathermap.org/data/2.5/weather'
}

const city = document.getElementById('nombre-ciudad');
const temp = document.getElementById('temperatura-ciudad');
const icon = document.getElementById('icono-clima');
const description = document.getElementById('descripcion-clima');
const span = document.getElementById('nombre-ciudad-span');
const temMax = document.getElementById('max');
const temMin = document.getElementById('min');
const sensTermica = document.getElementById('termica');
const presion = document.getElementById('presion');
const humedad = document.getElementById('humedad');
const vis = document.getElementById('visibilidad');
const viento = document.getElementById('viento');
const nubes = document.getElementById('nubosidad');

function encodeDataForURL(data) {
    return Object.entries(data)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
}
  
function getDataFromURL() {
    const searchParams = new URLSearchParams(window.location.search);
    const data = {};
  
    for (const [key, value] of searchParams.entries()) {
      data[key] = decodeURIComponent(value);
    }
  
    return data;
}

async function search(query) {
    try {
      const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&units=metric&lang=es`);

      const data = await response.json();
  
      const iconCode = data.weather[0].icon;
  
      // Codificar los datos y agregarlos como parámetros de consulta a la URL
    const dataToSend = {
        name: data.name,
        temperature: data.main.temp.toFixed(1),
        icon: `img/icons/${iconCode}.png`,
        description: data.weather[0].description,
        min: data.main.temp_min.toFixed(1),
        max: data.main.temp_max.toFixed(1),
        termica: data.main.feels_like.toFixed(1),
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        visibility: (data.visibility) / 1000,
        wind: (data.wind.speed).toFixed(1),
        clouds: data.clouds.all
    };

        const encodedData = encodeDataForURL(dataToSend);

        // Redirigir a 'hoy.html' con los datos en la URL
        window.location.href = `hoy.html?${encodedData}`;
  
      // Actualizar los elementos HTML con los nuevos datos
      temp.innerHTML = (data.main.temp).toFixed(1) + '°C';
      icon.src = `img/icons/${iconCode}.png`;
      icon.alt = `icono ${data.weather[0].description}`;
      description.innerHTML = data.weather[0].description;
      span.innerHTML = data.name;
      temMin.innerHTML = data.main.temp_min + '°C';
      temMax.innerHTML = data.main.temp_max + '°C';
      sensTermica.innerHTML = data.main.feels_like + '°C';
      presion.innerHTML = data.main.pressure + 'hPa';
      humedad.innerHTML = data.main.humidity + '%';
      vis.innerHTML = data.main.visibility + 'km';
      viento.innerHTML = (data.wind.speed).toFixed(1) + ' km/h';
      nubes.innerHTML = data.clouds.all + '%';
  
    } catch (error) {
      console.log(error);
    }
  }
const form = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    search(searchbox.value);
});
console.log()

//ACA LO DEBERIA ACTUALIZAR 
document.addEventListener('DOMContentLoaded', function() {
  const data = getDataFromURL();
  if (Object.keys(data).length > 0) {
    // Actualizar los elementos HTML con los datos de la URL
    temp.innerHTML = data.temperature;
    icon.src = data.icon;
    icon.alt = `icono ${data.description}`;
    description.innerHTML = data.description;
    span.innerHTML = data.name;
    temMax.innerHTML = data.max + '°C';
    temMin.innerHTML = data.min + '°C';
    sensTermica.innerHTML = data.termica + '°C';
    presion.innerHTML = data.pressure + ' hPa';
    humedad.innerHTML = data.humidity + '%';
    vis.innerHTML = data.visibility + ' km';
    viento.innerHTML = data.wind + ' km/h';
    nubes.innerHTML = data.clouds + '%';
  } else {
    const cityData = localStorage.getItem("cityData");
    if (cityData) {
      const parsedData = JSON.parse(cityData);
      // Actualizar los elementos HTML con los datos de localStorage
      temp.innerHTML = parsedData.temperature;
      icon.src = parsedData.icon;
      icon.alt = `icono ${parsedData.description}`;
      description.innerHTML = parsedData.description;
      span.innerHTML = parsedData.name;
      temMax.innerHTML = parsedData.max + '°C';
      temMin.innerHTML = parsedData.min + '°C';
      sensTermica.innerHTML = parsedData.termica + '°C';
      presion.innerHTML = parsedData.pressure + 'hPa';
      humedad.innerHTML = parsedData.humidity + '%';
      vis.innerHTML = parsedData.visibility + 'km';
      viento.innerHTML = parsedData.wind + 'km/h';
      nubes.innerHTML = parsedData.clouds + '%';
    }
  }
});