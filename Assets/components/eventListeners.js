
import { getWeatherData } from './weather.js';

export function setupEventListeners() {
    const inputSearch = document.querySelector("input");
    const btnSearch = document.querySelector("#search-btn");
    const menuIcon = document.querySelector("#menu-icon");
    const sidebarClose = document.querySelector("#sidebar-close");
    const cityImgDescContainer = document.querySelector('.city-img-desc-container');

    menuIcon.addEventListener("click", function() {
        const sidebar = document.querySelector("#sidebar");
        sidebar.classList.toggle("show");

        if (sidebar.classList.contains("show")) {
            const citiesList = localStorage.getItem("searchedCities");
            const sidebarContent = document.querySelector("#sidebar-content");
            sidebarContent.innerHTML = "";

            if (citiesList) {
                const citiesArr = citiesList.split(",");
                citiesArr.forEach((city) => {
                    const card = document.createElement("div");
                    card.classList.add("city-card");
                    card.innerHTML = `
                        <span class="city-name">${city}</span>
                        <span class="delete-city"><i class="fas fa-trash-alt"></i></span>
                    `;

                    const deleteBtn = card.querySelector(".delete-city");
                    deleteBtn.addEventListener("click", function(event) {
                        event.stopPropagation();
                        const cityName = event.target.parentElement.parentElement.querySelector(".city-name").textContent;
                        const citiesArr = localStorage.getItem("searchedCities").split(",");
                        const newCitiesArr = citiesArr.filter((c) => c !== cityName);
                        //cerca a ke serve filter 
                        localStorage.setItem("searchedCities", newCitiesArr.join(","));
                        event.target.parentElement.parentElement.remove();
                    });

                    card.addEventListener("click", function() {
                        getWeatherData(city, true); 
                    });

                    sidebarContent.appendChild(card);
                });
            }
        }
    });

    sidebarClose.addEventListener("click", function() {
        const sidebar = document.querySelector("#sidebar");
        sidebar.classList.remove("show");
    });


    btnSearch.addEventListener("click", async function(event) {
        event.preventDefault();
        const searchValue = inputSearch.value;
        
        try {
            await getWeatherData(searchValue);
    
            cityImgDescContainer.style.display = 'block';
            
            errorContainer.style.display = 'none';
            errorMessage.textContent = '';
    
        } catch (error) {
            errorMessage.textContent = `City "${searchValue}" not found!`;
            errorContainer.style.display = 'block';
    
            // Hide city information container
            cityImgDescContainer.style.display = 'none';
        }
    });
}
