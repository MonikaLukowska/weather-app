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

// function getForecast(cityId) {
//     const key = '5480f732e4b00a16aa00aaf7e311ee62';
//     fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${key}`)
//         .then(response => response.json())
//         .then((data) => {
//             displayForecast(data)
//             //put data from api
//             function displayForecast(data) {
//                 console.log(data);
//                 for (let value of [0, 1, 2, 3, 4]) {
//                     document.getElementById(`day${value+1}`).innerHTML = data.list[value*8].dt_txt;
//                     document.getElementById(`icon${value+1}`).src = `http://openweathermap.org/img/wn/${data.list[value*8].weather[0].icon}@2x.png`
//                     document.getElementById(`temp${value+1}`).innerHTML = Math.round(parseFloat(data.list[value*8].main.temp) - 273.15) + '&deg;';
//                     document.getElementById(`wind${value+1}`).innerHTML = `Wiatr: ${data.list[value*8].wind.speed}km/h`;
//                     console.log(value);
//                 }
//             }

//         })
// }


// function getForecast(cityId) {

//         document.getElementById(`day1`).innerHTML = "Poniedziałek";
//         document.getElementById(`icon1`).src = 'img\amcharts_weather_icons_1.0.0\static\day.svg';
//         document.getElementById(`temp1`).innerHTML = "20";
//         document.getElementById(`wind1`).innerHTML = `Wiatr: 50km/h`;
//         document.getElementById(`day5`).innerHTML = "Piątek";
//         document.getElementById(`icon5`).src = 'img\amcharts_weather_icons_1.0.0\static\day.svg';
//         document.getElementById(`temp5`).innerHTML = "20";
//         document.getElementById(`wind5`).innerHTML = `Wiatr: 50km/h`;
//     }
                
function getForecast(cityId) {
    const key = '5480f732e4b00a16aa00aaf7e311ee62';
    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${key}`)
        .then(response => response.json())
        .then((data) => {
            displayForecast(data)
            //put data from api
            function displayForecast(data) {
                console.log(data);
                for (let value of [0, 1, 2, 3, 4]) {
                    document.getElementById(`day${value+1}`).innerHTML = data.list[value*8].dt_txt;
                    document.getElementById(`icon${value+1}`).src = `http://openweathermap.org/img/wn/${data.list[value*8].weather[0].icon}@2x.png`
                    document.getElementById(`temp${value+1}`).innerHTML = Math.round(parseFloat(data.list[value*8].main.temp) - 273.15) + '&deg;';
                    document.getElementById(`wind${value+1}`).innerHTML = `Wiatr: ${data.list[value*8].wind.speed}km/h`;
                    console.log(value);
                }
            }

        })
}



getWeather(cityId);
getForecast(cityId);



$('.slide-container').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    useCss: false,
    autoplaySpeed: 3000,
    nextArrow: $('.next'),
    prevArrow: $('.prev'),

});