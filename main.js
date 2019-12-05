let spans = document.querySelectorAll('.welcome span');

console.log(spans);
spans.forEach((span, index) => {
    span.addEventListener('mouseover', (e) => {
        e.target.classList.add('active');
    });
    span.addEventListener('animationend', (e) => {
        e.target.classList.remove('active');
    });

    // Initial animation
    setTimeout(() => {
        span.classList.add('active');
    }, 150 * (index + 1))
});


document.addEventListener('DOMContentLoaded', function () {

    const btn = document.getElementById("submit");
    btn.addEventListener("click", function () {
        const city = ((document.getElementById("search") || {}).value) || "";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=de7a1829247078d4fed1cb801cd2f95d`;
        const url_fore = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=de7a1829247078d4fed1cb801cd2f95d`;
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                displayWeather(data)
                //display data from api
                function displayWeather(data) {

                    const icon = data.weather[0].icon;

                    document.getElementById('city-name').innerHTML = data.name;
                    document.getElementById('temperature').innerHTML = Math.ceil(data.main.temp) + '&deg;C';
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
                    console.log(main);

                    if (main === 'Rain' || main === 'Drizzle' && (d.getHours() < 19 || d.getHours() > 5)) {
                        document.body.className = 'rainy';
                    } else if (main === 'Clouds' && (d.getHours() < 19 && d.getHours() > 5)) {
                        document.body.className = 'cloudy';
                    } else if (main === 'Snow' && (d.getHours() < 19 && d.getHours() > 5)) {
                        document.body.className = 'snowy';
                    } else if (main === 'Thunderstorm' && (d.getHours() < 19 || d.getHours() > 5)) {
                        document.body.className = 'stormy';
                    } else if (d.getHours() > 18 || d.getHours() < 6) {
                        document.body.className = 'night';
                    } else {
                        document.body.className = 'sunny';
                    }
                }

            })

        fetch(url_fore)
            .then(response => response.json())
            .then((data) => {
                displayForecast(data)
                //change string to day name
                function changeDate(value) {
                    const days = ['Sunday', 'Monday', 'Tueasday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const date_str = data.list[value * 8 - 1].dt_txt;
                    const d = new Date(date_str);
                    const dayName = days[d.getDay()];
                    return dayName;
                }
                //put data from api
                function displayForecast(data) {
                    console.log(data);
                    for (let value of [1, 2, 3, 4, 5]) {
                        document.getElementById(`day_name${value}`).innerHTML = changeDate(value);
                        document.getElementById(`day${value}`).innerHTML = data.list[value * 8 - 1].dt_txt.slice(0, 16);
                        document.getElementById(`icon${value}`).src = `http://openweathermap.org/img/wn/${data.list[value*8-1].weather[0].icon}@2x.png`
                        document.getElementById(`temp${value}`).innerHTML = Math.ceil(data.list[value * 8 - 1].main.temp) + '&deg;C';
                        document.getElementById(`wind${value}`).innerHTML = `<img src="img/wind.svg" alt="ikona wiatru"> : ${data.list[value*8-1].wind.speed}km/h`;
                    }
                }

            })


            .then(() => {
                document.getElementById('app-block').classList.add('active');
                document.getElementById('slider').classList.add('show');

            })

            .catch(error => alert("Please enter valid city name"));
    })
})



$('.slide-container').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    useCss: false,
    infinite: false,
    autoplaySpeed: 3000,
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