const container = document.querySelector('.container');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();
    
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === ''){
        mostrarError('Todos los campos son obligatorios');
        return;
    }

    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
    // Crear un elemento de error y añadirlo al contenedor de resultados
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error', 'p-4', 'mb-4', 'font-medium', 'text-center', 'text-red-800', 'rounded-lg', 'bg-red-50', 'dark:bg-gray-800', 'dark:text-red-400');
    errorDiv.textContent = mensaje;
    container.appendChild(errorDiv);

    // Eliminar el mensaje de error después de 3 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function consultarAPI(ciudad, pais) {
    const appId = '19c06cff51a829be5a71f88716e646e1';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener el clima');
        }
        return response.json();
      })
      .then(data => {
        mostrarClima(data);
      })
      .catch(error => {
        mostrarError(error.message);
      });
}
function mostrarClima(data) {
    const temperaturaKelvin = data.main.temp;
    const temperaturaCelsius = temperaturaKelvin - 273.15;
    const ciudad = document.querySelector('#ciudad').value;
    const descripcionClima = data.weather[0].description;
    const iconoClima = obtenerIconoClima(descripcionClima);

    resultado.innerHTML = `
        <p class="text-lg font-semibold mb-2">La temperatura actual en ${ciudad} es de:</p>
        <p> Condición: ${data.weather[0].description}</p>
        <img src="${iconoClima}" alt="Icono del clima" class="w-20 h-20 mt-4 mx-auto">
        <p class="text-5xl font-bold text-purple-500 text-blue-500">${temperaturaCelsius.toFixed(1)}°C</p>
        
    `;
}  

function obtenerIconoClima(descripcionClima) {
    switch (descripcionClima.toLowerCase()) {
        case 'broken clouds':
            return 'img/nubesysol.png'; 
        case 'scattered clouds':
            return 'img/nubes-dispersas.png'; 
        case 'light rain':
            return 'img/lluvia.png'; 
        case 'clear sky':
            return 'img/sol.png'; 
        case 'few clouds':
            return 'img/nubes-dispersas.png';
        default:
            return 'img/default.png'; 
    }
    
}


// function mostrarClima(data) {

//     resultado.textContent = `Temperatura: ${data.main.temp}°C, Condición: ${data.weather[0].description}`;

//     const nubosidad = data.clouds.all;
//     resultado.innerHTML += `<p>Nubosidad: ${nubosidad}%</p>`;
// }

     
