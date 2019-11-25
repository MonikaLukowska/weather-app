let cityId = 420006353;

//fetch api
function getWeather(cityId) {
    const key = '5480f732e4b00a16aa00aaf7e311ee62';
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}`)
        .then(response => response.json())
        .then((data) => {
            displayWeather(data)
            //put data from api
            function displayWeather(data) {
                const celcius = Math.round(parseFloat(data.main.temp) - 273.15);
                const icon = data.weather[0].icon;

                document.getElementById('city-name').innerHTML = data.name;
                document.getElementById('temperature').innerHTML = celcius + '&deg;';
                document.getElementById('weather').innerHTML = data.weather[0].description;
                document.getElementById('wind').innerHTML = `Wiatr: ${data.wind.speed}km/h`;
                document.getElementById('humidity').innerHTML = `Wilgotność: ${data.main.humidity}%`;
                document.getElementById('main-icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`


                //change background
                const main = data.weather[0].main;


                if (main === 'Rain') {
                    document.body.className = 'rainy';
                } else if (main === 'Clouds') {
                    document.body.className = 'cloudy';
                } else if (main === 'Snow') {
                    document.body.className = 'snowy';
                } else if (main === 'Thunderstorm') {
                    document.body.className = 'stormy';
                } else {
                    document.body.className = 'sunny';
                }
            }

        })
}
getWeather(cityId);


$('.slide-container').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    useCss: false,
    autoplaySpeed: 2000,
    nextArrow: $('.next'),
    prevArrow: $('.prev'),

});