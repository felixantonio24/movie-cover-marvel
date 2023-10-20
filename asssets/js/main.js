const url = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=8f485329359989e492459d24f3d4800c&hash=0e65c1d7131e068b809613845669f4cd';

// Seleccionar el elemento HTML donde se mostrarán los nombres de las series
const movieH2 = document.querySelector('#movie__h2');
// Seleccionar el elemento HTML donde se mostrarán las imágenes de las series
const seriesImagesContainer = document.querySelector('#series-images-container');

// Realizar una solicitud GET a la API de Marvel
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Acceder a los nombres de las series asociadas a un personaje
    if (data.data && data.data.results && data.data.results.length > 0) {
      const character = data.data.results[0]; // Supongamos que estamos interesados en el primer personaje en los resultados.
      const series = character.series.items;
      const seriesNames = series.map(item => item.name);

      // Actualizar el contenido del elemento HTML con los nombres de las series
      movieH2.textContent = 'Nombres de las series asociadas al personaje: ' + seriesNames.join(', ');

      // Obtener las imágenes de las series
      series.forEach(item => {
        const seriesDetailURL = item.resourceURI + `?ts=1&apikey=8f485329359989e492459d24f3d4800c&hash=0e65c1d7131e068b809613845669f4cd`;
        
        fetch(seriesDetailURL)
          .then(response => response.json())
          .then(seriesData => {
            const seriesThumbnail = seriesData.data.results[0].thumbnail;
            const img = document.createElement('img');
            img.src = `${seriesThumbnail.path}.${seriesThumbnail.extension}`;
            seriesImagesContainer.appendChild(img);
          })
          .catch(error => {
            console.error('Error al obtener los detalles de las series:', error);
          });
      });
    } else {
      console.error('No se encontraron resultados de personajes.');
    }
  })
  .catch(error => {
    console.error('Error al realizar la solicitud a la API de Marvel:', error);
  });
