function getWeather(cityID) {
    const key = '{5480f732e4b00a16aa00aaf7e311ee62}';
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityID}&APPID=${key}`)
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
}
getWeather(4175117);