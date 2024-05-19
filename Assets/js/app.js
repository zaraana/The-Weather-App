const apiKey = "5df48503bb9108a7a6f2da0b76fbce00";
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=`;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const inputSearch = document.querySelector("input");
const btnSearch = document.querySelector("button");
const weatherIcon = document.querySelector("#weather-icon"); 



async function getWeatherData(city){
    const response = await fetch( apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    const forecastData = await getForecastData(city);

    console.log(data);

    const utcTime = data.dt * 1000;
    const offset = new Date().getTimezoneOffset() * 60 * 1000;
    const localTime = utcTime + offset;
    
    const time = new Date(localTime);
    const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour12: true,
        });

    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset *1000);
    
    if(time > sunriseTime && time < sunsetTime){
        document.querySelector("#dayNight-icon").src = "Assets/images/sun.png";
        document.querySelector("#dayNight-icon").style = "width:38px";
    }
    else{
        document.querySelector("#dayNight-icon").src = "Assets/images/moon .png";
        document.querySelector("#dayNight-icon").style = "width:29px";
        document.body.style.backgroundImage = "url('Assets/images/night.jpg')";
        document.body.style.color = "white";
        document.querySelector('i').style.color = "white";
    }
    // data on its place html
    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind").innerHTML = data.wind.speed +"km/h";
    document.querySelector("#time").innerHTML = "Time: " + formattedTime;

    if(data.weather[0].main == "Clear"){
        weatherIcon.src = "Assets/images/clear.png";
    }
    else if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "Assets/images/clouds.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "Assets/images/mist.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "Assets/images/drizzle.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "Assets/images/rain.png";
    }
    else if(data.weather[0].main == "Storm"){
        weatherIcon.src = "Assets/images/rain.png";
    }
    else if(data.weather[0].main == "Wind"){
        weatherIcon.src = "Assets/images/rain.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "Assets/images/rain.png";
    }


        

    // show hidden containers
    document.querySelector(".time-showcase").style.display = "flex";
    document.querySelector(".weatherContainer").style.display = "flex";


    // add forecast 5 cards 
    async function getForecastData(city) {
        const response = await fetch(forecastUrl + city + `&appid=${apiKey}`);
        const data = await response.json();
        return data;
        }
        

    const dateString = data.dt;
    console.log(dateString);
    
    const date = new Date(dateString * 1000);
    
    const year = date.getFullYear();
    const month = date.getMonth() +1;
    const day = date.getDate();
    
    document.querySelector("#date").textContent = `Date: ${month}/${day}/${year}`;
    console.log(`${month}/${day}/${year}`);
    
    // clear previous forecast card data
    document.querySelector(".forecast").innerHTML = "";

     // get next 5 days from today
    const today = new Date();
    let nextFiveDays = [];

    for (let i = 0; i < 5; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i + 1);
        nextFiveDays.push(nextDay);
    }

    // create new forecast cards and populate with data
    const forecastCards = nextFiveDays.map((day) => {
        // find the forecast data for this day
        const forecast = forecastData.list.find(item => {
        const dayStr = new Date(item.dt_txt).toDateString();
        console.log(dayStr);
        const splitDate = dayStr.split(" ");

        return day.toDateString() === dayStr;
        });

        // if there's no forecast for this day, return an empty string
        if (!forecast) {
        return '';
        }

        // create the forecast card HTML using the forecast data
        // const weatherIconUrl = getWeatherIcon(forecast.weather[0].main);
        
        let icon = '';
        let iconWeather = forecast.weather[0].main;
        console.log(iconWeather);
        switch(iconWeather){
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
            case 'Rain':
                icon = 'Assets/images/rain.png';
            break;
            case 'Storm':
                icon = 'Assets/images/storm.png';
            break;
            case 'Clear':
                icon = 'Assets/images/clear.png';
            break;
            case 'Clouds':
                icon = 'Assets/images/clouds.png';
            break;
            case 'Drizzle':
                icon = 'Assets/images/drizzle.png';
            break;


        }

        // get the name of the day and the month number
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

    // add forecast cards to the page
    document.querySelector(".forecast").innerHTML = forecastCards.join("");
    }


    btnSearch.addEventListener("click", function() {
        const searchValue = inputSearch.value;
        getWeatherData(searchValue);
    });


btnSearch.addEventListener("click", function() {
    const searchValue = inputSearch.value;
    getWeatherData(searchValue);
});



