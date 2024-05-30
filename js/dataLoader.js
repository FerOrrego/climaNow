const { createApp } = Vue;

// Lógica para actualizar los datos en localStorage
async function actualizarDatosLocalStorage() {
  const api = {
    url: 'https://api.openweathermap.org/data/2.5/weather',
    key: '51f45238d65c53a7432991be89a284b2'
  };
  const cityNames = ["Buenos Aires", "Córdoba", "Mendoza", "San Juan", "Neuquén", "Corrientes", "Rawson", "Ushuaia"];

  const arrayJson = [];

  for (let i = 0; i < cityNames.length; i++) {
    try {
      const response = await fetch(`${api.url}?q=${cityNames[i]}&appid=${api.key}&units=metric&lang=es`);
      const data = await response.json();
      arrayJson.push(data);
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Almacenar los datos en localStorage
  localStorage.setItem("citiesData", JSON.stringify(arrayJson));
}

// Actualizar los datos en localStorage al recargar la página
window.addEventListener('load', () => {
  actualizarDatosLocalStorage();
});

// Crear la aplicación Vue
const app = createApp({
  name: "WeatherList",
  data() {
    return {
      cities: []
    };
  },
  mounted() {
    // Obtener los datos desde localStorage
    const citiesData = localStorage.getItem("citiesData");
    if (citiesData) {
      // Si los datos están en localStorage, cargarlos
      this.cities = JSON.parse(citiesData);
    }
  }
});

app.mount("#app");