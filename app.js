/* weather API:https://www.weatherapi.com/
*/

const baseUrl = 'http://api.weatherapi.com/v1';
const apiKey = '<your api key>';
const currentMethod = '/current.json';
const forecastMethod = '/forecast.json';

/*
Request parameters: 
key=apiKey
q=whatever data is sent back
days=number of days (only required for forecast)
*/

const futureWeather = async () => {
    const params = `?key=${apiKey}&q=auto:ip&days=3`;
    const fetchRequest = `${baseUrl}${forecastMethod}${params}`;

    //html
    const container = document.getElementById('container');

        try {
        const response = await fetch(fetchRequest);

        if(response.ok) {
            const jsonResponse = await response.json();
            //get all responses
            const currentResponse = jsonResponse.current;
            const zeroResponse = jsonResponse.forecast.forecastday[0];
            const oneResponse = jsonResponse.forecast.forecastday[1];
            const twoResponse = jsonResponse.forecast.forecastday[2];
            console.log(jsonResponse)

            //get the time
            let today = new Date();
            let time = today.getHours();

            //conditional to check for icon image
            let timeOfDay;
            if (time <= 12) {
                timeOfDay = 'day';
            } else {
                timeOfDay = 'night';
            }
            //curent weather icon
            let currentWeatherIcon = currentResponse.condition.icon;
            let imageSnippetCurrent = `${currentWeatherIcon.slice(-7, -4)}.png`;
            let imageUrlCurrent = `img/${timeOfDay}/${imageSnippetCurrent}`;
            //forecast [0] weather icon
            let zeroWeatherIcon = zeroResponse.day.condition.icon;
            let imageSnippetZero = `${zeroWeatherIcon.slice(-7, -4)}.png`;
            let imageUrlZero = `img/${timeOfDay}/${imageSnippetZero}`;
            //forecast [1] weather icon
            let oneWeatherIcon = oneResponse.day.condition.icon;
            let imageSnippetOne = `${oneWeatherIcon.slice(-7, -4)}.png`;
            let imageUrlOne = `img/${timeOfDay}/${imageSnippetOne}`;
            //forecast [2] weather icon
            let twoWeatherIcon = twoResponse.day.condition.icon;
            let imageSnippetTwo = `${twoWeatherIcon.slice(-7, -4)}.png`;
            let imageUrlTwo = `img/${timeOfDay}/${imageSnippetTwo}`;
            

            //beginning building app

            let html = `
            <div class="current">
            ${jsonResponse.location.name}<br>
            <span id="main-temp" class="temp-img-container">${currentResponse.temp_f}° <img width="50px" src="${imageUrlCurrent}"/></span>
            ${currentResponse.condition.text}
            </div>

            <div class="line"></div>

            <div class="forecast-container">
            3-Day Forecast
            <div class="forecast">
            <div class="forecast-ind"><span id="forecast-temp" class="temp-img-container">${zeroResponse.day.avgtemp_f}°<img width="50px" src="${imageUrlZero}"/></span>${zeroResponse.day.condition.text}</div>
            <div class="forecast-ind"><span id="forecast-temp" class="temp-img-container">${oneResponse.day.avgtemp_f}°<img width="50px" src="${imageUrlOne}"/></span>${oneResponse.day.condition.text}</div>
            <div class="forecast-ind"><span id="forecast-temp" class="temp-img-container">${twoResponse.day.avgtemp_f}°<img width="50px" src="${imageUrlTwo}"/></span>${twoResponse.day.condition.text}</div>
            </div>
            </div>
            `;

            container.innerHTML = html;
            }
        } catch(error) {
        console.log(error)
        }

}

futureWeather();

