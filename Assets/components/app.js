
// // const apiKey = "5df48503bb9108a7a6f2da0b76fbce00";
// // const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=`;
// // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
// // const inputSearch = document.querySelector("input");
// // const btnSearch = document.querySelector("#search-btn");
// // const weatherIcon = document.querySelector("#weather-icon"); 

// // async function getWeatherData(city, fromSidebar = false) {   
// //     if (fromSidebar) { 
// //         document.querySelector("#sidebar").classList.remove("show"); 
// //     } 

// //     // remove city card from sidebar
// //     const sidebarContent = document.querySelector("#sidebar-content");
// //     const cityCards = sidebarContent.querySelectorAll(".city-card");
// //     cityCards.forEach((card) => {
// //         if (card && card.querySelector(".city-name") && card.querySelector(".city-name").textContent === city) {
// //             card.remove();
// //         }
// //     });

// //     // Fetch current weather data
// //     const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
// //     const data = await response.json();

// //     // Fetch forecast data
// //     const forecastData = await getForecastData(city);

// //     // Call other functions to display data
// //     displayWeatherData(data);
// //     displayForecastCards(forecastData);   

// //     const searchedCities = localStorage.getItem("searchedCities");
// //     if (searchedCities) {
// //         const citiesArr = searchedCities.split(",");
// //         if (!citiesArr.includes(city)) {
// //             citiesArr.push(city);
// //             localStorage.setItem("searchedCities", citiesArr.join(","));
// //             // searchedCities(); // <- This line is causing an error
// //         }
// //     } else {
// //         localStorage.setItem("searchedCities", city);
// //         // searchedCities(); // <- This line is causing an error
// //     }

// //     // show hidden containers
// //     document.querySelector(".time-showcase").style.display = "flex";
// //     document.querySelector(".weatherContainer").style.display = "flex";

// //     changeDayNightIcon(data);
// // }

// // async function getForecastData(city) {
// //     // add forecast 5 cards 
// //     const response = await fetch(forecastUrl + city + `&appid=${apiKey}`);
// //     const data = await response.json();
// //     return data;
// // }

// // function displayWeatherData(data) {
// //     // Display current weather data
// //     document.querySelector("#city").innerHTML = data.name;
// //     document.querySelector("#temperature").innerHTML = Math.round(data.main.temp) + "°C";
// //     document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
// //     document.querySelector("#wind").innerHTML = data.wind.speed +"km/h";
// //     document.querySelector("#time").innerHTML = "Time: " + getTime(data);

// //     setWeatherIcon(data.weather[0].main);
// // }

// // function getTime(data) {
// //     // Calculate and return formatted time
// //     const utcTime = data.dt * 1000;
// //     const offset = new Date().getTimezoneOffset() * 60 * 1000;
// //     const localTime = utcTime + offset;

// //     const time = new Date(localTime);
// //     const formattedTime = time.toLocaleTimeString([], {
// //         hour: "2-digit",
// //         minute: "2-digit",
// //         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
// //         hour12: true,
// //     });

// //     return formattedTime;
// // }

// // function changeDayNightIcon(data) {
// //     const sunriseTime = new Date(data.sys.sunrise * 1000);
// //     const sunsetTime = new Date(data.sys.sunset *1000);

// //     const time = new Date();

// //     if(time > sunriseTime && time < sunsetTime){
// //         document.querySelector("#dayNight-icon").src = "Assets/images/sun.png";
// //         document.querySelector("#dayNight-icon").style = "width:38px";
// //         document.body.style.backgroundImage = "url('Assets/images/bg.jpg')";
// //     } else {
// //         document.querySelector("#dayNight-icon").src = "Assets/images/moon .png";
// //         document.querySelector("#dayNight-icon").style = "width:29px";
// //         document.body.style.backgroundImage = "url('Assets/images/night.jpg')";
// //         document.body.style.color = "white";
// //         document.querySelector('i').style.color = "white";
// //         document.querySelector("h6").style.color = "white";
// //         document.querySelector(".logo").src = "Assets/images/logodark.png";
// //         document.querySelector("h2").style.color = "white";
// //         // document.querySelector("span").style.color = "white";
// //         // document.querySelector("deleteBtn").style.color = "white";
// //         // document.querySelector("");
// //     }
// // }

// // function setWeatherIcon(weather) {
// //     // Set weather icon based on weather condition
// //     let icon = '';
// //     switch(weather){
// //         case 'Clear':
// //             icon = 'Assets/images/clear.png';
// //             break;
// //         case 'Clouds':
// //             icon = 'Assets/images/clouds.png';
// //             break;
// //         case 'Mist':
// //             icon = 'Assets/images/mist.png';
// //             break;
// //         case 'Drizzle':
// //             icon = 'Assets/images/drizzle.png';
// //             break;
// //         case 'Rain':
// //             icon = 'Assets/images/rain.png';
// //             break;
// //         case 'Storm':
// //             icon = 'Assets/images/rain.png';
// //             break;
// //         case 'Wind':
// //             icon = 'Assets/images/rain.png';
// //             break;
// //         case 'Snow':
// //             icon = 'Assets/images/rain.png';
// //             break;
// //     }
// //     weatherIcon.setAttribute('src', icon);
// // }

// // function displayForecastCards(forecastData) {
// //     // Display forecast cards
// //     // create new forecast cards and populate with data
// //     const nextFiveDays = getNext5DaysForecast();
// //     const forecastCards = nextFiveDays.map((day) => {
// //         // find the forecast data for this day
// //         const forecast = forecastData.list.find(item => {
// //             const dayStr = new Date(item.dt_txt).toDateString();
// //             const splitDate = dayStr.split(" ");

// //             return day.toDateString() === dayStr;
// //         });

// //         // check if there is no forecast data for the fifth day
// //         if (day === nextFiveDays[4] && !forecast) {
// //             return '<div class="forecast-item">No forecast data available</div>';
// //         }

// //         // if there's no forecast for this day, return an empty string
// //         if (!forecast) {
// //             return '';
// //         }

// //         // create the forecast card HTML using the forecast data
// //         let icon = '';
// //         let iconWeather = forecast.weather[0].main;
// //         switch(iconWeather){
// //             case 'Rain':
// //                 icon = 'Assets/images/rain.png';
// //                 break;
// //             case 'Wind':
// //                 icon = 'Assets/images/wind.png';
// //                 break;
// //             case 'Mist':
// //                 icon = 'Assets/images/mist.png';
// //                 break;
// //             case 'Snow':
// //                 icon = 'Assets/images/snow.png';
// //                 break;
// //             case 'Drizzle':
// //                 icon = 'Assets/images/drizzle.png';
// //                 break;
// //             case 'Clear':
// //                 icon = 'Assets/images/clear.png';
// //                 break;
// //             case 'Clouds':
// //                 icon = 'Assets/images/clouds.png';
// //                 break;
// //         }

// //         const dayOfWeek = day.toLocaleDateString(undefined, { weekday: 'short' });
// //         const monthNum = day.getMonth() + 1;

// //         const cardHtml = `
// //             <div class="forecast-item">
// //                 <div class="date">${dayOfWeek}, ${day.getDate()} /${monthNum}</div>
// //                 <div class="temp">${Math.round(forecast.main.temp)}°C</div>
// //                 <div class="description">${forecast.weather[0].description}</div>
// //                 <div class="icon">
// //                     <img class="forecast-icon" src=${icon} alt="">
// //                 </div>
// //             </div>
// //         `;

// //         return cardHtml;
// //     });

// //     // add forecast cards to the page
// //     document.querySelector(".forecast").innerHTML = forecastCards.join("");
// // }

// // function getNext5DaysForecast() {
// //     // get next 5 days from today
// //     const today = new Date();
// //     let nextFiveDays = [];

// //     for (let i = 0; i < 5; i++) {
// //         const nextDay = new Date(today);
// //         nextDay.setDate(today.getDate() + i + 1);
// //         nextFiveDays.push(nextDay);
// //     }

// //     return nextFiveDays;
// // }

// // // add event listener to menu icon
// // const menuIcon = document.querySelector("#menu-icon");
// // menuIcon.addEventListener("click", function() {
// //     const sidebar = document.querySelector("#sidebar");
// //     sidebar.classList.toggle("show");

// //     if (sidebar.classList.contains("show")) {
// //         // show sidebar, create city cards
// //         const citiesList = localStorage.getItem("searchedCities");
// //         const sidebarContent = document.querySelector("#sidebar-content");
// //         sidebarContent.innerHTML = "";

// //         if (citiesList) {
// //             const citiesArr = citiesList.split(",");
// //             citiesArr.forEach((city) => {
// //                 const card = document.createElement("div");
// //                 card.classList.add("city-card");
// //                 card.innerHTML = `
// //                     <span class="city-name">${city}</span>
// //                     <span class="delete-city"><i class="fas fa-trash-alt"></i></span>
// //                 `;

// //                 // add click event listener to delete button
// //                 const deleteBtn = card.querySelector(".delete-city");
// //                 deleteBtn.addEventListener("click", function(event) {
// //                     event.stopPropagation(); // prevent the city card from closing on click
// //                     const cityName = event.target.parentElement.parentElement.querySelector(".city-name").textContent;
// //                     const citiesArr = localStorage.getItem("searchedCities").split(",");
// //                     const newCitiesArr = citiesArr.filter((c) => c !== cityName);
// //                     localStorage.setItem("searchedCities", newCitiesArr.join(","));
// //                     event.target.parentElement.parentElement.remove(); // delete the city card
// //                 });

// //                 card.addEventListener("click", function() {
// //                     getWeatherData(city);
// //                     document.querySelector("#sidebar").classList.remove("show");
// //                 });

// //                 sidebarContent.appendChild(card);
// //             });
// //         }
// //     }
// // });

// // // add event listener to close button
// // const sidebarClose = document.querySelector("#sidebar-close");
// // sidebarClose.addEventListener("click", function() {
// //     const sidebar = document.querySelector("#sidebar");
// //     sidebar.classList.remove("show");
// // });

// // btnSearch.addEventListener("click", async function(event) { // <--- Added async
// //     event.preventDefault(); // Prevent default form submission behavior
// //     const searchValue = inputSearch.value;
// //     await getWeatherData(searchValue); // <--- Added await
// // });

// // const deleteIcons = document.querySelectorAll('.delete-city');
// // deleteIcons.forEach(icon => {
// //     icon.addEventListener('click', () => {
// //         const city = icon.parentElement.querySelector(".city-name").textContent;
// //         const citiesArr = localStorage.getItem("searchedCities").split(",");
// //         const newCitiesArr = citiesArr.filter((c) => c !== city);
// //         localStorage.setItem("searchedCities", newCitiesArr.join(","));
// //         icon.parentElement.remove();
// //     });
// // });


// const apiKey = "5df48503bb9108a7a6f2da0b76fbce00";
// const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=`;
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
// const inputSearch = document.querySelector("input");
// const btnSearch = document.querySelector("#search-btn");
// const weatherIcon = document.querySelector("#weather-icon"); 

// async function getWeatherData(city, fromSidebar = false) {
//     if (fromSidebar) { 
//         document.querySelector("#sidebar").classList.remove("show"); 
//     } 

//     // remove city card from sidebar
//     const sidebarContent = document.querySelector("#sidebar-content");
//     const cityCards = sidebarContent.querySelectorAll(".city-card");
//     cityCards.forEach((card) => {
//         if (card && card.querySelector(".city-name") && card.querySelector(".city-name").textContent === city) {
//             card.remove();
//         }
//     });

//     // Fetch current weather data
//     const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
//     const data = await response.json();

//     // Fetch forecast data
//     const forecastData = await getForecastData(city);

//     // Fetch city picture and description
//     const [cityImage, cityDescription] = await Promise.all([
//         getCityImage(city),
//         getCityDescription(city)
//     ]);

//     // Call other functions to display data
//     displayWeatherData(data);
//     displayForecastCards(forecastData);
//     displayCityInfo(cityImage, cityDescription);

//     const searchedCities = localStorage.getItem("searchedCities");
//     if (searchedCities) {
//         const citiesArr = searchedCities.split(",");
//         if (!citiesArr.includes(city)) {
//             citiesArr.push(city);
//             localStorage.setItem("searchedCities", citiesArr.join(","));
//         }
//     } else {
//         localStorage.setItem("searchedCities", city);
//     }

//     // show hidden containers
//     document.querySelector(".time-showcase").style.display = "flex";
//     document.querySelector(".weatherContainer").style.display = "flex";

//     changeDayNightIcon(data);
// }

// async function getForecastData(city) {
//     // add forecast 5 cards 
//     const response = await fetch(forecastUrl + city + `&appid=${apiKey}`);
//     const data = await response.json();
//     return data;
// }

// async function getCityImage(city) {
//     const unsplashApiKey = 'TEepGyjVwZPJEgQIc9cPEGwPe-SXv8C2M26WktO6mBI'; 
//     try {
//         const response = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch image');
//         }
//         const data = await response.json();
//         return data.results.length > 0 ? data.results[0].urls.regular : 'default-image-url.jpg'; // Provide a default image URL
//     } catch (error) {
//         console.error(error);
//         return 'default-image-url.jpg'; // Provide a default image URL
//     }
// }


// async function getCityDescription(city) {
//     const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${city}`);
//     const data = await response.json();
//     return data.extract || 'No description available';
// }

// function displayWeatherData(data) {
//     // Display current weather data
//     document.querySelector("#city").innerHTML = data.name;
//     document.querySelector("#temperature").innerHTML = Math.round(data.main.temp) + "°C";
//     document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
//     document.querySelector("#wind").innerHTML = data.wind.speed + "km/h";
//     document.querySelector("#time").innerHTML = "Time: " + getTime(data);

//     setWeatherIcon(data.weather[0].main);
// }

// function displayCityInfo(imageUrl, description) {
//     document.querySelector("#city-image").src = imageUrl;
//     document.querySelector("#city-description").innerHTML = description;
// }

// function getTime(data) {
//     // Calculate and return formatted time
//     const utcTime = data.dt * 1000;
//     const offset = new Date().getTimezoneOffset() * 60 * 1000;
//     const localTime = utcTime - offset;

//     const time = new Date(localTime);
//     const formattedTime = time.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//         timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//         hour12: true,
//     });

//     return formattedTime;
// }

// function changeDayNightIcon(data) {
//     const sunriseTime = new Date(data.sys.sunrise * 1000);
//     const sunsetTime = new Date(data.sys.sunset * 1000);

//     const time = new Date();

//     if (time > sunriseTime && time < sunsetTime) {
//         document.querySelector("#dayNight-icon").src = "Assets/images/sun.png";
//         document.querySelector("#dayNight-icon").style = "width:38px";
//         document.body.style.backgroundImage = "url('Assets/images/bg.jpg')";
//     } else {
//         document.querySelector("#dayNight-icon").src = "Assets/images/moon .png";
//         document.querySelector("#dayNight-icon").style = "width:29px";
//         document.body.style.backgroundImage = "url('Assets/images/night.jpg')";
//         document.body.style.color = "white";
//         document.querySelector('i').style.color = "white";
//         document.querySelector("h6").style.color = "white";
//         document.querySelector(".logo").src = "Assets/images/logodark.png";
//         document.querySelector("h2").style.color = "white";
//     }
// }

// function setWeatherIcon(weather) {
//     // Set weather icon based on weather condition
//     let icon = '';
//     switch (weather) {
//         case 'Clear':
//             icon = 'Assets/images/clear.png';
//             break;
//         case 'Clouds':
//             icon = 'Assets/images/clouds.png';
//             break;
//         case 'Mist':
//             icon = 'Assets/images/mist.png';
//             break;
//         case 'Drizzle':
//             icon = 'Assets/images/drizzle.png';
//             break;
//         case 'Rain':
//             icon = 'Assets/images/rain.png';
//             break;
//         case 'Storm':
//             icon = 'Assets/images/rain.png';
//             break;
//         case 'Wind':
//             icon = 'Assets/images/rain.png';
//             break;
//         case 'Snow':
//             icon = 'Assets/images/rain.png';
//             break;
//     }
//     weatherIcon.setAttribute('src', icon);
// }

// function displayForecastCards(forecastData) {
//     // Display forecast cards
//     const nextFiveDays = getNext5DaysForecast();
//     const forecastCards = nextFiveDays.map((day) => {
//         // find the forecast data for this day
//         const forecast = forecastData.list.find(item => {
//             const dayStr = new Date(item.dt_txt).toDateString();
//             return day.toDateString() === dayStr;
//         });

//         // check if there is no forecast data for the fifth day
//         if (day === nextFiveDays[4] && !forecast) {
//             return '<div class="forecast-item">No forecast data available</div>';
//         }

//         // if there's no forecast for this day, return an empty string
//         if (!forecast) {
//             return '';
//         }

//         // create the forecast card HTML using the forecast data
//         let icon = '';
//         let iconWeather = forecast.weather[0].main;
//         switch (iconWeather) {
//             case 'Rain':
//                 icon = 'Assets/images/rain.png';
//                 break;
//             case 'Wind':
//                 icon = 'Assets/images/wind.png';
//                 break;
//             case 'Mist':
//                 icon = 'Assets/images/mist.png';
//                 break;
//             case 'Snow':
//                 icon = 'Assets/images/snow.png';
//                 break;
//             case 'Drizzle':
//                 icon = 'Assets/images/drizzle.png';
//                 break;
//             case 'Clear':
//                 icon = 'Assets/images/clear.png';
//                 break;
//             case 'Clouds':
//                 icon = 'Assets/images/clouds.png';
//                 break;
//         }

//         const dayOfWeek = day.toLocaleDateString(undefined, { weekday: 'short' });
//         const monthNum = day.getMonth() + 1;

//         const cardHtml = `
//             <div class="forecast-item">
//                 <div class="date">${dayOfWeek}, ${day.getDate()} /${monthNum}</div>
//                 <div class="temp">${Math.round(forecast.main.temp)}°C</div>
//                 <div class="description">${forecast.weather[0].description}</div>
//                 <div class="icon">
//                     <img class="forecast-icon" src=${icon} alt="">
//                 </div>
//             </div>
//         `;

//         return cardHtml;
//     });

//     // add forecast cards to the page
//     document.querySelector(".forecast").innerHTML = forecastCards.join("");
// }

// function getNext5DaysForecast() {
//     // get next 5 days from today
//     const today = new Date();
//     let nextFiveDays = [];

//     for (let i = 0; i < 5; i++) {
//         const nextDay = new Date(today);
//         nextDay.setDate(today.getDate() + i + 1);
//         nextFiveDays.push(nextDay);
//     }

//     return nextFiveDays;
// }

// // add event listener to menu icon
// const menuIcon = document.querySelector("#menu-icon");
// menuIcon.addEventListener("click", function() {
//     const sidebar = document.querySelector("#sidebar");
//     sidebar.classList.toggle("show");

//     if (sidebar.classList.contains("show")) {
//         // show sidebar, create city cards
//         const citiesList = localStorage.getItem("searchedCities");
//         const sidebarContent = document.querySelector("#sidebar-content");
//         sidebarContent.innerHTML = "";

//         if (citiesList) {
//             const citiesArr = citiesList.split(",");
//             citiesArr.forEach((city) => {
//                 const card = document.createElement("div");
//                 card.classList.add("city-card");
//                 card.innerHTML = `
//                     <span class="city-name">${city}</span>
//                     <span class="delete-city"><i class="fas fa-trash-alt"></i></span>
//                 `;

//                 // add click event listener to delete button
//                 const deleteBtn = card.querySelector(".delete-city");
//                 deleteBtn.addEventListener("click", function(event) {
//                     event.stopPropagation(); // prevent the city card from closing on click
//                     const cityName = event.target.parentElement.parentElement.querySelector(".city-name").textContent;
//                     const citiesArr = localStorage.getItem("searchedCities").split(",");
//                     const newCitiesArr = citiesArr.filter((c) => c !== cityName);
//                     localStorage.setItem("searchedCities", newCitiesArr.join(","));
//                     event.target.parentElement.parentElement.remove(); // delete the city card
//                 });

//                 card.addEventListener("click", function() {
//                     getWeatherData(city);
//                     document.querySelector("#sidebar").classList.remove("show");
//                 });

//                 sidebarContent.appendChild(card);
//             });
//         }
//     }
// });

// // add event listener to close button
// const sidebarClose = document.querySelector("#sidebar-close");
// sidebarClose.addEventListener("click", function() {
//     const sidebar = document.querySelector("#sidebar");
//     sidebar.classList.remove("show");
// });

// btnSearch.addEventListener("click", async function(event) {
//     event.preventDefault(); // Prevent default form submission behavior
//     const searchValue = inputSearch.value;
//     await getWeatherData(searchValue); // Wait for weather data to be fetched
// });

// const deleteIcons = document.querySelectorAll('.delete-city');
// deleteIcons.forEach(icon => {
//     icon.addEventListener('click', () => {
//         const city = icon.parentElement.querySelector(".city-name").textContent;
//         const citiesArr = localStorage.getItem("searchedCities").split(",");
//         const newCitiesArr = citiesArr.filter((c) => c !== city);
//         localStorage.setItem("searchedCities", newCitiesArr.join(","));
//         icon.parentElement.remove();
//     });
// });
