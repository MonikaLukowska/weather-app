//let cityId = 2643743;


//fetch api
document.addEventListener('DOMContentLoaded', function () {

    const btn = document.getElementById("submit");
    btn.addEventListener("click", function () {
        const city = ((document.getElementById("search") || {}).value) || "";

        const url = `http://api.openweathermap.org/data/2.5/weather?q=` + city + `&units=metric&appid=de7a1829247078d4fed1cb801cd2f95d`;
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                displayWeather(data)
                //put data from api
                function displayWeather(data) {

                    const icon = data.weather[0].icon;

                    document.getElementById('city-name').innerHTML = data.name;
                    document.getElementById('temperature').innerHTML = Math.ceil(data.main.temp) + '&deg;';
                    document.getElementById('weather').innerHTML = data.weather[0].description;
                    document.getElementById('wind').innerHTML = `: ${data.wind.speed}km/h`;
                    document.getElementById('humidity').innerHTML = `: ${data.main.humidity}%`;
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
            .then(() => {
                document.getElementById('app-block').classList.add('active');
                document.getElementById('slider').classList.add('show');

            })
    })
})


$('.slide-container').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    useCss: true,
    infinite: false,
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