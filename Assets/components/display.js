export function displayWeatherData(data) {
    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector("#time").innerHTML = "Time: " + getTime(data);

    setWeatherIcon(data.weather[0].main);
}

export function displayCityInfo(imageUrl, description) {
    const cityImage = document.querySelector("#city-image");
    if (cityImage) {
        cityImage.src = imageUrl;
        cityImage.classList.add('city-image'); 
    }

    const cityDescription = document.querySelector("#city-description");
    if (cityDescription) {
        cityDescription.innerHTML = description;
    }
}

export function displayForecastCards(forecastData) {
    const nextFiveDays = getNext5DaysForecast();
    const forecastCards = nextFiveDays.map((day) => {
        const forecast = forecastData.list.find(item => {
            const dayStr = new Date(item.dt_txt).toDateString();
            return day.toDateString() === dayStr;
        });

        if (day === nextFiveDays[4] && !forecast) {
            return '<div class="forecast-item">"No forecast data available"</div>';
        }

        if (!forecast) {
            return '';
        }

        let icon = '';
        let iconWeather = forecast.weather[0].main;
        switch (iconWeather) {
            case 'Rain':
                icon = 'Assets/images/rain.png';
                break;
            case 'Wind':
                icon = 'Assets/images/wind.png';
                break;
            case 'Mist':
                icon = 'Assets/images/mist.png';
                break;
            case 'Snow':
                icon = 'Assets/images/snow.png';
                break;
            case 'Drizzle':
                icon = 'Assets/images/drizzle.png';
                break;
            case 'Clear':
                icon = 'Assets/images/clear.png';
                break;
            case 'Clouds':
                icon = 'Assets/images/clouds.png';
                break;
        }

        const dayOfWeek = day.toLocaleDateString(undefined, { weekday: 'short' });
        const monthNum = day.getMonth() + 1;

        const cardHtml = `
            <div class="forecast-item">
                <div class="date">${dayOfWeek}, ${day.getDate()} /${monthNum}</div>
                <div class="temp">${Math.round(forecast.main.temp)}°C</div>
                <div class="description">${forecast.weather[0].description}</div>
                <div class="icon">
                    <img class="forecast-icon" src=${icon} alt="">
                </div>
            </div>
        `;

        return cardHtml;
    });

    document.querySelector(".forecast").innerHTML = forecastCards.join("");
}

function getNext5DaysForecast() {
    const today = new Date();
    let nextFiveDays = [];

    for (let i = 0; i < 5; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i + 1);
        nextFiveDays.push(nextDay);
    }

    return nextFiveDays;
}

export function changeDayNightIcon(data) {
    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset * 1000);
    const time = new Date();

    if (time > sunriseTime && time < sunsetTime) {
        document.querySelector("#dayNight-icon").src = "Assets/images/sun.png";
        document.querySelector("#dayNight-icon").style = "width:38px";
        document.body.style.backgroundImage = "url('Assets/images/bg.jpg')";
    } else {
        document.querySelector("#dayNight-icon").src = "Assets/images/moon .png";
        document.querySelector("#dayNight-icon").style = "width:29px";
        document.body.style.backgroundImage = "url('Assets/images/night.jpg')";
        document.body.style.color = "white";
        document.querySelector('i').style.color = "white";
        document.querySelector("h6").style.color = "white";
        document.querySelector(".logo").src = "Assets/images/logoweatherappdark.png";
        document.querySelector("h2").style.color = "white";
        document.querySelector(".city-card").style.color = "white";


    }
}

function setWeatherIcon(weather) {
    let icon = '';
    switch (weather) {
        case 'Clear':
            icon = 'Assets/images/clear.png';
            break;
        case 'Clouds':
            icon = 'Assets/images/clouds.png';
            break;
        case 'Mist':
            icon = 'Assets/images/mist.png';
            break;
        case 'Drizzle':
            icon = 'Assets/images/drizzle.png';
            break;
        case 'Rain':
            icon = 'Assets/images/rain.png';
            break;
        case 'Storm':
            icon = 'Assets/images/rain.png';
            break;
        case 'Wind':
            icon = 'Assets/images/rain.png';
            break;
        case 'Snow':
            icon = 'Assets/images/rain.png';
            break;
    }
    document.querySelector("#weather-icon").setAttribute('src', icon);
}

function getTime(data) {
    const utcTime = data.dt * 1000;
    const offset = new Date().getTimezoneOffset() * 60 * 1000;
    const localTime = utcTime - offset;

    const time = new Date(localTime);
    const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour12: true,
    });

    return formattedTime;
}
