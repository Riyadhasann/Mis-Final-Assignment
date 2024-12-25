document.getElementById("searchButton").addEventListener("click", function () {
    var countryName = document.getElementById("searchBox").value.trim();
    if (countryName) {
        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
            .then(response => response.json())
            .then(data => displayCountryInfo(data[0] || {}))
            .catch(() => alert('Country not found'));
    } else {
        alert('Please enter a valid country name');
    }
});

function displayCountryInfo(country) {
    var { flags, name, capital, currencies, population, region } = country;
    var countryInfoDiv = document.getElementById("countryInfo");
    
    countryInfoDiv.innerHTML = "";

    var countryCard = document.createElement("div");
    countryCard.className = "col";
    countryCard.innerHTML = `
        <div class="card">
            <img src="${flags?.svg}" class="card-img-top" alt="Flag">
            <div class="card-body">
                <h5 class="card-title">${name?.common}</h5>
                <p class="card-text"><strong>Capital:</strong> ${capital ? capital[0] : 'N/A'}</p>
                <p class="card-text"><strong>Region:</strong> ${region || 'N/A'}</p>
                <p class="card-text"><strong>Currency:</strong> ${currencies ? Object.values(currencies)[0]?.name : 'N/A'}</p>
                <p class="card-text"><strong>Population:</strong> ${population ? population : 'N/A'}</p>
                <button class="btn btn-primary" onclick="fetchWeather('${capital ? capital[0] : ''}')">See Weather</button>
            </div>
        </div>
    `;

    countryInfoDiv.appendChild(countryCard);
    document.getElementById("countryInfo").style.display = 'grid';
}

function fetchWeather(city) {
    if (!city) {
        alert("No capital available for weather.");
        return;
    }

    var key = "48ad610911c747689b735311240312";
    var url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Unable to fetch weather data");
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(err => {
            console.error(err);
            alert("Error fetching weather data. Please try again.");
        });
}

function displayWeather(data) {
    var { name } = data.location;
    var { text, icon } = data.current.condition;
    var { temp_c, humidity } = data.current;

    document.getElementById("cityName").innerText = `Weather in ${name}`;
    document.getElementById("weatherImage").src = `http:${icon}`;
    document.getElementById("weatherImage").alt = text;
    document.getElementById("details").innerText = `Weather: ${text}, Temp: ${temp_c}°C, Humidity: ${humidity}%`;

    document.getElementById("weatherSection").style.display = "block";
}