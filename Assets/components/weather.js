import { displayWeatherData, displayForecastCards, displayCityInfo, changeDayNightIcon } from './display.js';
import { getForecastData, getCityImage, getCityDescription } from './externalApis.js';

const apiKey = "5df48503bb9108a7a6f2da0b76fbce00";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

export async function getWeatherData(city, fromSidebar = false) {
    if (fromSidebar) {
        document.querySelector("#sidebar").classList.remove("show");
    }

    const sidebarContent = document.querySelector("#sidebar-content");
    const cityCards = sidebarContent.querySelectorAll(".city-card");
    cityCards.forEach((card) => {
        const cityNameElement = card.querySelector(".city-name");
        if (cityNameElement && cityNameElement.textContent === city) {
            card.remove();
        }
    });

    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    const data = await response.json();

    const forecastData = await getForecastData(city);

    const [cityImage, cityDescription] = await Promise.all([
        getCityImage(city),
        getCityDescription(city)
    ]);

    displayWeatherData(data);
    displayForecastCards(forecastData);
    displayCityInfo(cityImage, cityDescription);

    const searchedCities = localStorage.getItem("searchedCities");
    if (searchedCities) {
        const citiesArr = searchedCities.split(",");
        if (!citiesArr.includes(city)) {
            citiesArr.push(city);
            localStorage.setItem("searchedCities", citiesArr.join(","));
        }
    } else {
        localStorage.setItem("searchedCities", city);
    }

    document.querySelector(".time-showcase").style.display = "flex";
    document.querySelector(".weatherContainer").style.display = "flex";

    changeDayNightIcon(data);
}

//vite.js
//vercel 
//env
//security for keys so that wont be use