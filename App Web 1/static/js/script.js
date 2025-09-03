const apiKey = '70bef2ed1c5c46a268613b7f3c77b0a7'; // Remplacez par votre propre clé API OpenWeatherMap

function getWeather() {
  const city = document.getElementById('city').value;
  const weatherDiv = document.getElementById('weather');

  if (!city) {
    weatherDiv.innerHTML = '<p>Veuillez entrer une ville.</p>';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Ville non trouvée');
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      weatherDiv.innerHTML = `
        <h2>${city}</h2>
        <p><img src="${iconUrl}" alt="icon météo"> ${desc}</p>
        <p>🌡️ Température: ${temp} °C</p>
      `;
    })
    .catch(error => {
      weatherDiv.innerHTML = `<p>Erreur : ${error.message}</p>`;
    });
}
