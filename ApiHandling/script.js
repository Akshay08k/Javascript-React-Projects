document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    const API_KEY = "facca59aaf6429803a0a3b974b7bc9fb"
    getWeatherBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city === "") {
            alert("Please Enter City Name")
        }
        else {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    if (data.cod == "404") {
                        alert("City Not Found");
                        cityInput.style.border = "2px solid red";
                        errorMessage.textContent = "City not found. Please try again.";
                        weatherInfo.classList.remove("hidden");
                    } else {
                        weatherInfo.classList.remove("hidden");
                        cityNameDisplay.textContent = "Loading...."
                        setTimeout(() => {
                            cityInput.style.border = "none";
                            cityNameDisplay.textContent = data.name;
                            temperatureDisplay.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
                            descriptionDisplay.textContent = data.weather[0].description;
                            errorMessage.textContent = "";
                            cityInput.value = "";
                        }, 2000)

                    }
                })
        }
    })
});