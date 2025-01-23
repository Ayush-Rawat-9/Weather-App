document.addEventListener("DOMContentLoaded", () => {
    const key = "9fddb311e9e7bd46b11764b1a31a48ac"; 
    const search_bar = document.getElementById("search_bar");
    const search_button = document.getElementById("search_button");
    const weathericon = document.getElementById("weather_img");
    const api = "https://api.openweathermap.org/data/2.5/weather?q=";

    async function getWeather(city_name) {
        try {
            const response = await fetch(`${api}${city_name}&appid=${key}&units=metric`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();

            console.log(data);

            document.getElementById("city").innerHTML = data.name;
            document.getElementById("temp").innerHTML = data.main.temp + "°C";
            document.getElementById("humidity").innerHTML = data.main.humidity + "% <br> Humidity";
            document.getElementById("wind_speed").innerHTML = data.wind.speed + "km/h <br> Wind Speed";

            if (data.weather[0].main == "Clouds") {
                weathericon.src = "images/clouds.png";
            } else if (data.weather[0].main == "Clear") {
                weathericon.src = "images/clear.png";
            } else if (data.weather[0].main == "Rain") {
                weathericon.src = "images/rain.png";
            } else if (data.weather[0].main == "Drizzle") {
                weathericon.src = "images/drizzle.png";
            } else if (data.weather[0].main == "Mist") { 
                weathericon.src = "images/mist.png";
            }
            document.querySelector(".output").style.display = "block";

        } catch (error) {
            console.error("Failed to fetch weather data:", error.message);
            alert("Unable to fetch weather data. Please check the city name or try again later.");
        }
    }

    search_button.addEventListener("click", () => {
        const city_name = search_bar.value.trim();
        if (city_name) 
        {
            getWeather(city_name);
        } 
        else 
        {
            alert("Please enter a city name.");
        }
    });
});
