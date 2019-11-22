//
const cityId = 2643743;

function getWeather(cityID) {
    const key = '{5480f732e4b00a16aa00aaf7e311ee62}';
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}`)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            displayWeather(data)
        })
        .catch(function () {});
}

function displayWeather(data) {
    const celcius = Math.round(parseFloat(data.main.temp) - 273.15);

    document.getElementById('city-name').innerHTML = data.name;
    document.getElementById('temperature').innerHTML = celcius + '&deg;';
    document.getElementById('weather').innerHTML = data.weather[0].description;
    document.getElementById('wind').innerHTML = `Wiatr: ${data.wind.speed}km/h`;
    document.getElementById('humidity').innerHTML = `Wilgotność: ${data.main.humidity}`;
    document.getElementById('main-icon').src.innerHTML = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    if (data.weather[0].main === 'Rain') {
        document.body.className = 'rainy';
    } else if (data.weather[0].main === 'Clouds') {
        document.body.className = 'cloudy';
    } else if (data.weather[0].main === 'Snow') {
        document.body.className = 'snowy';
    } else if (data.weather[0].main === 'Thunderstorm') {
        document.body.className = 'stormy';
    } else if (data.weather[0].main === 'Clear') {
        document.body.className = 'suny';
    }
}
getWeather(2643743);