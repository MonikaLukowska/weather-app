//let cityId = 2643743;


//fetch api
document.addEventListener('DOMContentLoaded', function () {

    const btn = document.getElementById("submit");
    btn.addEventListener("click", function () {
        const city = ((document.getElementById("search") || {}).value) || "";

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},pl&units=metric&appid=de7a1829247078d4fed1cb801cd2f95d`;
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                displayWeather(data)
                //display data from api
                function displayWeather(data) {

                    const icon = data.weather[0].icon;

                    document.getElementById('city-name').innerHTML = data.name;
                    document.getElementById('temperature').innerHTML = Math.ceil(data.main.temp) + '&deg;';
                    document.getElementById('weather').innerHTML = data.weather[0].description;
                    document.getElementById('wind').innerHTML = `: ${data.wind.speed}km/h`;
                    document.getElementById('humidity').innerHTML = `: ${data.main.humidity}%`;
                    document.getElementById('main-icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

                    // display time
                    const weekdays = ['Sunday', 'Monday', 'Tueasday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                    const d = new Date();
                    const today = weekdays[d.getDay()];
                    const hour = d.getHours();
                    const minute = d.getMinutes();
                    const time = ("0" + hour).slice(-2) + ":" + ("0" + minute).slice(-2);
                    const dateTime = `${today}, ${time}`;

                    document.getElementById('time').innerHTML = dateTime;

                    //change background
                    const main = data.weather[0].main;
                    console.log(d.getHours());

                    if (main === 'Rain' && (d.getHours() < 19 || d.getHours() > 5)) {
                        document.body.className = 'rainy';
                    } else if (main === 'Clouds' && (d.getHours() < 19 && d.getHours() > 5)) {
                        document.body.className = 'cloudy';
                    } else if (main === 'Snow' && (d.getHours() < 19 && d.getHours() > 5)) {
                        document.body.className = 'snowy';
                    } else if (main === 'Thunderstorm' && (d.getHours() < 19 || d.getHours() > 5)) {
                        document.body.className = 'stormy';
                    } else if (d.getHours() > 19 || d.getHours() < 6) {
                        document.body.className = 'night';
                    } else {
                        document.body.className = 'sunny';
                    }
                }

            })
            .then(() => {
                document.getElementById('app-block').classList.add('active');
                document.getElementById('slider').classList.add('show');

            })
            .catch(error => alert("Please enter polish city name"));
    })
})


$('.slide-container').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    useCss: true,
    infinite: slides.length > 2,
    autoplaySpeed: 2000,
    nextArrow: $('.next'),
    prevArrow: $('.prev'),

})



// const endpoint = 'https://raw.githubusercontent.com/babel2008/Pogoda2/master/cities.json';
// const cities = [];
// fetch(endpoint)
//     .then(blob => blob.json())
//     .then(data => cities.push(...data))

// function findMatches(wordToMatch, cities) {
//     return cities.filter(place => {
//         const regex = new RegExp(wordToMatch, 'gi');
//         return place.city.match(regex)
//     });
// }

// function displayMatches() {
//     const matchArray = findMatches(this.value, cities);
//     const html = matchArray.map(place => {
//         const regex = new RegExp(this.value, 'gi');
//         const cityName = place.city.replace(regex, `<span class="h1">${this.value}</span>`);
//         return `
//         <li>
//             <span class="name">${cityName}</span>
//         </li>
//         `;
//     }).join('');
//     suggestions.innerHTML = html;
// }

// const searchInput = document.querySelector('.search');
// const suggestions = document.querySelector('.suggestions');

// searchInput.addEventListener('change', displayMatches);
// searchInput.addEventListener('keyup', displayMatches);