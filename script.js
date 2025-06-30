const apiKey = ;
const lat = 32.321; // Newton, MS
const lon = -89.112;

async function fetchWeather() {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    console.log('Weather data fetched:', data);
    renderCurrentWeather(data.current);
    renderForecast(data.daily.slice(0, 7));
  } catch (err) {
    console.error('Failed to fetch weather data:', err.message);
    document.getElementById('current-weather').innerHTML = '<div class="text-red-500">Failed to load current weather data.</div>';
    document.getElementById('forecast-container').innerHTML = '<div class="text-red-500">Failed to load forecast data.</div>';
  }
}

function renderCurrentWeather(current) {
  const container = document.getElementById('current-weather');
  container.innerHTML = `
    <div><strong>Temperature:</strong> ${current.temp} °F</div>
    <div><strong>Feels Like:</strong> ${current.feels_like} °F</div>
    <div><strong>Humidity:</strong> ${current.humidity}%</div>
    <div><strong>UV Index:</strong> <span title="UV Index measures sunburn risk">${current.uvi}</span></div>
    <div><strong>Pressure:</strong> ${current.pressure} hPa</div>
    <div><strong>Wind:</strong> ${current.wind_speed} mph</div>
  `;
}

function renderForecast(days) {
  const container = document.getElementById('forecast-container');
  container.innerHTML = days.map(day => {
    const date = new Date(day.dt * 1000);
    return `
      <div class="bg-white p-4 rounded shadow">
        <div class="font-semibold">${date.toDateString()}</div>
        <div>🌡️ High: ${day.temp.max}°F</div>
        <div>🌡️ Low: ${day.temp.min}°F</div>
        <div>☁️ ${day.weather[0].description}</div>
        <div title="UV Index measures sunburn risk">🔆 UV Index: ${day.uvi}</div>
      </div>
    `;
  }).join('');
}

setInterval(fetchWeather, 5 * 60 * 1000); // Every 5 minutes
window.onload = fetchWeather;
