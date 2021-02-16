const form = document.querySelector('#location-form')

let city_submitted = "Chicago"
    
const _getWeather = async () => {
    let api_key = "0c9275e005544d1d828e0dbe3329e8a8"

    if(isNaN(Number(city_submitted))){
        request = new Request(`https://api.openweathermap.org/data/2.5/weather?q=${city_submitted}&appid=${api_key}`);
    }
    else {
        request = new Request(`https://api.openweathermap.org/data/2.5/weather?zip=${city_submitted}&appid=${api_key}`);
    }
    let result = await fetch(request);
    let current_weather = await result.json();
    console.log(current_weather)

    let lat = current_weather.coord.lat
    let lon = current_weather.coord.lon

    request = new Request(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`)
    result = await fetch(request);
    let forecast = await result.json();
    console.log(forecast)

    return {current_weather, forecast}
}

async function _displayWeather(){
    let weather = {};
    weather = await _getWeather();

    function addAlerts() {
        for(i=0; i < weather.forecast.alerts.length; i++){
            let button = document.createElement("span");
            button.id = "alert"
            button.innerHTML = weather.forecast.alerts[i].event
            button.title = weather.forecast.alerts[i].description

            const alert_div = document.getElementById("alert-div");
            alert_div.appendChild(button);
        }
    }
    while(document.getElementById('alert')){
        alert = document.getElementById('alert')
        alert.remove()
    }
    while(document.getElementById('alert-info')){
        alert_info = document.getElementById('alert-info')
        alert_info.remove()
    }

    if(weather.forecast.alerts){
        addAlerts()

        let alert_info = document.createElement("p");
        alert_info.innerHTML = "Hover over for more details"
        alert_info.id = "alert-info"

        const current_conditions = document.getElementById("current-conditions");
        parentDiv = document.getElementById("weather-card");
        parentDiv.insertBefore(alert_info, current_conditions);
    }


    document.getElementById('city').innerHTML = weather.current_weather.name;        
    
    document.getElementById('current-temp').innerHTML = Math.round((weather.current_weather.main.temp - 273.15) * 9 / 5 + 32); 
    document.getElementById('today-high-temp').innerHTML = Math.round((weather.forecast.daily[0].temp.max - 273.15) * 9 / 5 + 32); 
    document.getElementById('today-low-temp').innerHTML = Math.round((weather.forecast.daily[0].temp.min - 273.15) * 9 / 5 + 32); 
    const wind_directions = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"]
    document.getElementById('wind-direction').innerHTML = wind_directions[Math.floor((weather.current_weather.wind.deg + 11.25) / 22.5)]; 
    document.getElementById('wind').innerHTML = Math.round(weather.current_weather.wind.speed * 2.237); 
    document.getElementById('wind-unit').innerHTML = "mph"
    document.getElementById('feels-like').innerHTML = Math.round((weather.current_weather.main.feels_like - 273.15) * 9 / 5 + 32);
    document.getElementById('humidity').innerHTML = weather.current_weather.main.humidity + "%";
    
    document.getElementById("icon-image-1").src = `http://openweathermap.org/img/wn/${weather.current_weather.weather[0].icon}@2x.png`;
    document.getElementById("icon-image-2").src = ""
    if(weather.current_weather.weather[1]){
        document.getElementById("icon-image-2").src = `http://openweathermap.org/img/wn/${weather.current_weather.weather[1].icon}@2x.png`;
    }
    
    document.getElementById("icon-image-3").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[1].weather[0].icon}@2x.png`;
    document.getElementById("icon-image-4").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[2].weather[0].icon}@2x.png`;
    document.getElementById("icon-image-5").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[3].weather[0].icon}@2x.png`;
    document.getElementById("icon-image-6").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[4].weather[0].icon}@2x.png`;
    document.getElementById("icon-image-7").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[5].weather[0].icon}@2x.png`;
    document.getElementById("icon-image-8").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[6].weather[0].icon}@2x.png`;
    document.getElementById("icon-image-9").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[7].weather[0].icon}@2x.png`;

    document.getElementById("day-1-high").innerHTML = Math.round((weather.forecast.daily[1].temp.max - 273.15) * 9/5 + 32);
    document.getElementById("day-2-high").innerHTML = Math.round((weather.forecast.daily[2].temp.max - 273.15) * 9/5 + 32);
    document.getElementById("day-3-high").innerHTML = Math.round((weather.forecast.daily[3].temp.max - 273.15) * 9/5 + 32);
    document.getElementById("day-4-high").innerHTML = Math.round((weather.forecast.daily[4].temp.max - 273.15) * 9/5 + 32);
    document.getElementById("day-5-high").innerHTML = Math.round((weather.forecast.daily[5].temp.max - 273.15) * 9/5 + 32);
    document.getElementById("day-6-high").innerHTML = Math.round((weather.forecast.daily[6].temp.max - 273.15) * 9/5 + 32);
    document.getElementById("day-7-high").innerHTML = Math.round((weather.forecast.daily[7].temp.max - 273.15) * 9/5 + 32);

    document.getElementById("day-1-low").innerHTML = Math.round((weather.forecast.daily[1].temp.min - 273.15) * 9/5 + 32);
    document.getElementById("day-2-low").innerHTML = Math.round((weather.forecast.daily[2].temp.min - 273.15) * 9/5 + 32);
    document.getElementById("day-3-low").innerHTML = Math.round((weather.forecast.daily[3].temp.min - 273.15) * 9/5 + 32);
    document.getElementById("day-4-low").innerHTML = Math.round((weather.forecast.daily[4].temp.min - 273.15) * 9/5 + 32);
    document.getElementById("day-5-low").innerHTML = Math.round((weather.forecast.daily[5].temp.min - 273.15) * 9/5 + 32);
    document.getElementById("day-6-low").innerHTML = Math.round((weather.forecast.daily[6].temp.min - 273.15) * 9/5 + 32);
    document.getElementById("day-7-low").innerHTML = Math.round((weather.forecast.daily[7].temp.min - 273.15) * 9/5 + 32);


    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let today = new Date();
    let day_of_week = today.getDay()
    for(i=0; i < 7; i++){
        day = document.getElementById(`day-${i+1}`)
        day.innerHTML = days[(day_of_week + i + 1) % 7].slice(0,3)
    }

    const celsius = document.querySelector('#celcius')
    const fahrenheit = document.querySelector('#fahrenheit')

    celcius.addEventListener('click', ( event ) => {
        event.preventDefault();

        document.getElementById('fahrenheit').style.color = 'blue';
        document.getElementById('celcius').style.color = 'black';
        document.getElementById('celcius').style.fontWeight = 700;
        document.getElementById('fahrenheit').style.fontWeight = 350;
        document.getElementById('celcius').style.fontSize = "17px";
        document.getElementById('fahrenheit').style.fontSize = "16px";

        document.getElementById('current-temp').innerHTML = Math.round(weather.current_weather.main.temp - 273.15); 
        document.getElementById('today-high-temp').innerHTML = Math.round(weather.forecast.daily[0].temp.max - 273.15); 
        document.getElementById('today-low-temp').innerHTML = Math.round(weather.forecast.daily[0].temp.min - 273.15); 
        document.getElementById('wind').innerHTML = Math.round(weather.current_weather.wind.speed); 
        document.getElementById('wind-unit').innerHTML = "m/s"
        document.getElementById('feels-like').innerHTML = Math.round(weather.current_weather.main.feels_like - 273.15);

        document.getElementById("day-1-high").innerHTML = Math.round(weather.forecast.daily[1].temp.max - 273.15);
        document.getElementById("day-2-high").innerHTML = Math.round(weather.forecast.daily[2].temp.max - 273.15);
        document.getElementById("day-3-high").innerHTML = Math.round(weather.forecast.daily[3].temp.max - 273.15);
        document.getElementById("day-4-high").innerHTML = Math.round(weather.forecast.daily[4].temp.max - 273.15);
        document.getElementById("day-5-high").innerHTML = Math.round(weather.forecast.daily[5].temp.max - 273.15);
        document.getElementById("day-6-high").innerHTML = Math.round(weather.forecast.daily[6].temp.max - 273.15);
        document.getElementById("day-7-high").innerHTML = Math.round(weather.forecast.daily[7].temp.max - 273.15);
    
        document.getElementById("day-1-low").innerHTML = Math.round(weather.forecast.daily[1].temp.min - 273.15);
        document.getElementById("day-2-low").innerHTML = Math.round(weather.forecast.daily[2].temp.min - 273.15);
        document.getElementById("day-3-low").innerHTML = Math.round(weather.forecast.daily[3].temp.min - 273.15);
        document.getElementById("day-4-low").innerHTML = Math.round(weather.forecast.daily[4].temp.min - 273.15);
        document.getElementById("day-5-low").innerHTML = Math.round(weather.forecast.daily[5].temp.min - 273.15);
        document.getElementById("day-6-low").innerHTML = Math.round(weather.forecast.daily[6].temp.min - 273.15);
        document.getElementById("day-7-low").innerHTML = Math.round(weather.forecast.daily[7].temp.min - 273.15);

    } )
    fahrenheit.addEventListener('click', ( event ) => {
        event.preventDefault();

        document.getElementById('fahrenheit').style.color = 'black';
        document.getElementById('celcius').style.color = 'blue';
        document.getElementById('celcius').style.fontWeight = 350;
        document.getElementById('fahrenheit').style.fontWeight = 700;
        document.getElementById('celcius').style.fontSize = "16px";
        document.getElementById('fahrenheit').style.fontSize = "17px";

        document.getElementById('current-temp').innerHTML = Math.round((weather.current_weather.main.temp - 273.15) * 9 / 5 + 32);  
        document.getElementById('today-high-temp').innerHTML = Math.round((weather.forecast.daily[0].temp.max - 273.15) * 9 / 5 + 32); 
        document.getElementById('today-low-temp').innerHTML = Math.round((weather.forecast.daily[0].temp.min - 273.15) * 9 / 5 + 32); 
        document.getElementById('wind').innerHTML = Math.round(weather.current_weather.wind.speed * 2.237); 
        document.getElementById('wind-unit').innerHTML = "mph"
        document.getElementById('feels-like').innerHTML = Math.round((weather.current_weather.main.feels_like - 273.15) * 9 / 5 + 32);

        document.getElementById("day-1-high").innerHTML = Math.round((weather.forecast.daily[1].temp.max - 273.15) * 9/5 + 32);
        document.getElementById("day-2-high").innerHTML = Math.round((weather.forecast.daily[2].temp.max - 273.15) * 9/5 + 32);
        document.getElementById("day-3-high").innerHTML = Math.round((weather.forecast.daily[3].temp.max - 273.15) * 9/5 + 32);
        document.getElementById("day-4-high").innerHTML = Math.round((weather.forecast.daily[4].temp.max - 273.15) * 9/5 + 32);
        document.getElementById("day-5-high").innerHTML = Math.round((weather.forecast.daily[5].temp.max - 273.15) * 9/5 + 32);
        document.getElementById("day-6-high").innerHTML = Math.round((weather.forecast.daily[6].temp.max - 273.15) * 9/5 + 32);
        document.getElementById("day-7-high").innerHTML = Math.round((weather.forecast.daily[7].temp.max - 273.15) * 9/5 + 32);
    
        document.getElementById("day-1-low").innerHTML = Math.round((weather.forecast.daily[1].temp.min - 273.15) * 9/5 + 32);
        document.getElementById("day-2-low").innerHTML = Math.round((weather.forecast.daily[2].temp.min - 273.15) * 9/5 + 32);
        document.getElementById("day-3-low").innerHTML = Math.round((weather.forecast.daily[3].temp.min - 273.15) * 9/5 + 32);
        document.getElementById("day-4-low").innerHTML = Math.round((weather.forecast.daily[4].temp.min - 273.15) * 9/5 + 32);
        document.getElementById("day-5-low").innerHTML = Math.round((weather.forecast.daily[5].temp.min - 273.15) * 9/5 + 32);
        document.getElementById("day-6-low").innerHTML = Math.round((weather.forecast.daily[6].temp.min - 273.15) * 9/5 + 32);
        document.getElementById("day-7-low").innerHTML = Math.round((weather.forecast.daily[7].temp.min - 273.15) * 9/5 + 32);

    } )
}

_displayWeather()

form.addEventListener('submit', ( event ) => {
    event.preventDefault();

    let city_submitted = document.querySelector('#location').value
    
    const _getWeather = async () => {
        let api_key = "0c9275e005544d1d828e0dbe3329e8a8"

        if(isNaN(Number(city_submitted))){
            request = new Request(`https://api.openweathermap.org/data/2.5/weather?q=${city_submitted}&appid=${api_key}`);
        }
        else {
            request = new Request(`https://api.openweathermap.org/data/2.5/weather?zip=${city_submitted}&appid=${api_key}`);
        }
        let result = await fetch(request);
        let current_weather = await result.json();
        console.log(current_weather)

        let lat = current_weather.coord.lat
        let lon = current_weather.coord.lon

        request = new Request(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`)
        result = await fetch(request);
        let forecast = await result.json();
        console.log(forecast)

        return {current_weather, forecast}
    }

    async function _displayWeather(){
        weather = {}
        weather = await _getWeather();

        function addAlerts() {
            for(i=0; i < weather.forecast.alerts.length; i++){
                let button = document.createElement("span");
                button.id = "alert"
                button.innerHTML = weather.forecast.alerts[i].event
                button.title = weather.forecast.alerts[i].description

                const alert_div = document.getElementById("alert-div");
                alert_div.appendChild(button);
            }
        }
        while(document.getElementById('alert')){
            alert = document.getElementById('alert')
            alert.remove()
        }
        while(document.getElementById('alert-info')){
            alert_info = document.getElementById('alert-info')
            alert_info.remove()
        }

        if(weather.forecast.alerts){
            addAlerts()

            let alert_info = document.createElement("p");
            alert_info.innerHTML = "Hover over for more details"
            alert_info.id = "alert-info"

            const current_conditions = document.getElementById("current-conditions");
            parentDiv = document.getElementById("weather-card");
            parentDiv.insertBefore(alert_info, current_conditions);
        }


        document.getElementById('city').innerHTML = weather.current_weather.name;        
    
    
        const wind_directions = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"]
        document.getElementById('wind-direction').innerHTML = wind_directions[Math.floor((weather.current_weather.wind.deg + 11.25) / 22.5)]; 
    
        document.getElementById('humidity').innerHTML = weather.current_weather.main.humidity + "%";
        
        document.getElementById("icon-image-1").src = `http://openweathermap.org/img/wn/${weather.current_weather.weather[0].icon}@2x.png`;
        document.getElementById("icon-image-2").src = ""
        if(weather.current_weather.weather[1]){
            document.getElementById("icon-image-2").src = `http://openweathermap.org/img/wn/${weather.current_weather.weather[1].icon}@2x.png`;
        }
        
        document.getElementById("icon-image-3").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[1].weather[0].icon}@2x.png`;
        document.getElementById("icon-image-4").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[2].weather[0].icon}@2x.png`;
        document.getElementById("icon-image-5").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[3].weather[0].icon}@2x.png`;
        document.getElementById("icon-image-6").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[4].weather[0].icon}@2x.png`;
        document.getElementById("icon-image-7").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[5].weather[0].icon}@2x.png`;
        document.getElementById("icon-image-8").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[6].weather[0].icon}@2x.png`;
        document.getElementById("icon-image-9").src = `https://openweathermap.org/img/wn/${weather.forecast.daily[7].weather[0].icon}@2x.png`;
        
        if(document.getElementById('fahrenheit').style.color == 'black'){
            document.getElementById('wind').innerHTML = Math.round(weather.current_weather.wind.speed * 2.237); 
            document.getElementById('wind-unit').innerHTML = "mph"
    
            document.getElementById('current-temp').innerHTML = Math.round((weather.current_weather.main.temp - 273.15) * 9 / 5 + 32); 
            document.getElementById('today-high-temp').innerHTML = Math.round((weather.forecast.daily[0].temp.max - 273.15) * 9 / 5 + 32); 
            document.getElementById('today-low-temp').innerHTML = Math.round((weather.forecast.daily[0].temp.min - 273.15) * 9 / 5 + 32); 
            document.getElementById('feels-like').innerHTML = Math.round((weather.current_weather.main.feels_like - 273.15) * 9 / 5 + 32);
    
            document.getElementById("day-1-high").innerHTML = Math.round((weather.forecast.daily[1].temp.max - 273.15) * 9/5 + 32);
            document.getElementById("day-2-high").innerHTML = Math.round((weather.forecast.daily[2].temp.max - 273.15) * 9/5 + 32);
            document.getElementById("day-3-high").innerHTML = Math.round((weather.forecast.daily[3].temp.max - 273.15) * 9/5 + 32);
            document.getElementById("day-4-high").innerHTML = Math.round((weather.forecast.daily[4].temp.max - 273.15) * 9/5 + 32);
            document.getElementById("day-5-high").innerHTML = Math.round((weather.forecast.daily[5].temp.max - 273.15) * 9/5 + 32);
            document.getElementById("day-6-high").innerHTML = Math.round((weather.forecast.daily[6].temp.max - 273.15) * 9/5 + 32);
            document.getElementById("day-7-high").innerHTML = Math.round((weather.forecast.daily[7].temp.max - 273.15) * 9/5 + 32);
        
            document.getElementById("day-1-low").innerHTML = Math.round((weather.forecast.daily[1].temp.min - 273.15) * 9/5 + 32);
            document.getElementById("day-2-low").innerHTML = Math.round((weather.forecast.daily[2].temp.min - 273.15) * 9/5 + 32);
            document.getElementById("day-3-low").innerHTML = Math.round((weather.forecast.daily[3].temp.min - 273.15) * 9/5 + 32);
            document.getElementById("day-4-low").innerHTML = Math.round((weather.forecast.daily[4].temp.min - 273.15) * 9/5 + 32);
            document.getElementById("day-5-low").innerHTML = Math.round((weather.forecast.daily[5].temp.min - 273.15) * 9/5 + 32);
            document.getElementById("day-6-low").innerHTML = Math.round((weather.forecast.daily[6].temp.min - 273.15) * 9/5 + 32);
            document.getElementById("day-7-low").innerHTML = Math.round((weather.forecast.daily[7].temp.min - 273.15) * 9/5 + 32);
        } else {
            document.getElementById('current-temp').innerHTML = Math.round(weather.current_weather.main.temp - 273.15); 
            document.getElementById('today-high-temp').innerHTML = Math.round(weather.forecast.daily[0].temp.max - 273.15); 
            document.getElementById('today-low-temp').innerHTML = Math.round(weather.forecast.daily[0].temp.min - 273.15); 
            document.getElementById('wind').innerHTML = Math.round(weather.current_weather.wind.speed); 
            document.getElementById('wind-unit').innerHTML = "m/s"
            document.getElementById('feels-like').innerHTML = Math.round(weather.current_weather.main.feels_like - 273.15);
    
            document.getElementById("day-1-high").innerHTML = Math.round(weather.forecast.daily[1].temp.max - 273.15);
            document.getElementById("day-2-high").innerHTML = Math.round(weather.forecast.daily[2].temp.max - 273.15);
            document.getElementById("day-3-high").innerHTML = Math.round(weather.forecast.daily[3].temp.max - 273.15);
            document.getElementById("day-4-high").innerHTML = Math.round(weather.forecast.daily[4].temp.max - 273.15);
            document.getElementById("day-5-high").innerHTML = Math.round(weather.forecast.daily[5].temp.max - 273.15);
            document.getElementById("day-6-high").innerHTML = Math.round(weather.forecast.daily[6].temp.max - 273.15);
            document.getElementById("day-7-high").innerHTML = Math.round(weather.forecast.daily[7].temp.max - 273.15);
        
            document.getElementById("day-1-low").innerHTML = Math.round(weather.forecast.daily[1].temp.min - 273.15);
            document.getElementById("day-2-low").innerHTML = Math.round(weather.forecast.daily[2].temp.min - 273.15);
            document.getElementById("day-3-low").innerHTML = Math.round(weather.forecast.daily[3].temp.min - 273.15);
            document.getElementById("day-4-low").innerHTML = Math.round(weather.forecast.daily[4].temp.min - 273.15);
            document.getElementById("day-5-low").innerHTML = Math.round(weather.forecast.daily[5].temp.min - 273.15);
            document.getElementById("day-6-low").innerHTML = Math.round(weather.forecast.daily[6].temp.min - 273.15);
            document.getElementById("day-7-low").innerHTML = Math.round(weather.forecast.daily[7].temp.min - 273.15);
        }

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let today = new Date();
        let day_of_week = today.getDay()
        for(i=0; i < 7; i++){
            day = document.getElementById(`day-${i+1}`)
            day.innerHTML = days[(day_of_week + i + 1) % 7].slice(0,3)
        }
    }

    _displayWeather()

    const celsius = document.querySelector('#celcius')
    const fahrenheit = document.querySelector('#fahrenheit')

    celcius.addEventListener('click', ( event ) => {
        event.preventDefault();

        document.getElementById('fahrenheit').style.color = 'blue';
        document.getElementById('celcius').style.color = 'black';
        document.getElementById('celcius').style.fontWeight = 700;
        document.getElementById('fahrenheit').style.fontWeight = 350;
        document.getElementById('celcius').style.fontSize = "17px";
        document.getElementById('fahrenheit').style.fontSize = "16px";

        document.getElementById('current-temp').innerHTML = Math.round(weather.current_weather.main.temp - 273.15); 
        document.getElementById('today-high-temp').innerHTML = Math.round(weather.forecast.daily[0].temp.max - 273.15); 
        document.getElementById('today-low-temp').innerHTML = Math.round(weather.forecast.daily[0].temp.min - 273.15); 
        document.getElementById('wind').innerHTML = Math.round(weather.current_weather.wind.speed); 
        document.getElementById('wind-unit').innerHTML = "m/s"
        document.getElementById('feels-like').innerHTML = Math.round(weather.current_weather.main.feels_like - 273.15);

        document.getElementById("day-1-high").innerHTML = Math.round(weather.forecast.daily[1].temp.max - 273.15);
        document.getElementById("day-2-high").innerHTML = Math.round(weather.forecast.daily[2].temp.max - 273.15);
        document.getElementById("day-3-high").innerHTML = Math.round(weather.forecast.daily[3].temp.max - 273.15);
        document.getElementById("day-4-high").innerHTML = Math.round(weather.forecast.daily[4].temp.max - 273.15);
        document.getElementById("day-5-high").innerHTML = Math.round(weather.forecast.daily[5].temp.max - 273.15);
        document.getElementById("day-6-high").innerHTML = Math.round(weather.forecast.daily[6].temp.max - 273.15);
        document.getElementById("day-7-high").innerHTML = Math.round(weather.forecast.daily[7].temp.max - 273.15);
    
        document.getElementById("day-1-low").innerHTML = Math.round(weather.forecast.daily[1].temp.min - 273.15);
        document.getElementById("day-2-low").innerHTML = Math.round(weather.forecast.daily[2].temp.min - 273.15);
        document.getElementById("day-3-low").innerHTML = Math.round(weather.forecast.daily[3].temp.min - 273.15);
        document.getElementById("day-4-low").innerHTML = Math.round(weather.forecast.daily[4].temp.min - 273.15);
        document.getElementById("day-5-low").innerHTML = Math.round(weather.forecast.daily[5].temp.min - 273.15);
        document.getElementById("day-6-low").innerHTML = Math.round(weather.forecast.daily[6].temp.min - 273.15);
        document.getElementById("day-7-low").innerHTML = Math.round(weather.forecast.daily[7].temp.min - 273.15);

    } )
    fahrenheit.addEventListener('click', ( event ) => {
        event.preventDefault();

        document.getElementById('fahrenheit').style.color = 'black';
        document.getElementById('celcius').style.color = 'blue';
        document.getElementById('celcius').style.fontWeight = 350;
        document.getElementById('fahrenheit').style.fontWeight = 700;
        document.getElementById('celcius').style.fontSize = "16px";
        document.getElementById('fahrenheit').style.fontSize = "17px";

        document.getElementById('current-temp').innerHTML = Math.round((weather.current_weather.main.temp - 273.15) * 9 / 5 + 32);  
        document.getElementById('today-high-temp').innerHTML = Math.round((weather.forecast.daily[0].temp.max - 273.15) * 9 / 5 + 32); 
        document.getElementById('today-low-temp').innerHTML = Math.round((weather.forecast.daily[0].temp.min - 273.15) * 9 / 5 + 32); 
        document.getElementById('wind').innerHTML = Math.round(weather.current_weather.wind.speed * 2.237); 
        document.getElementById('wind-unit').innerHTML = "mph"
        document.getElementById('feels-like').innerHTML = Math.round((weather.current_weather.main.feels_like - 273.15) * 9 / 5 + 32);

        document.getElementById("day-1-high").innerHTML = Math.round((weather.forecast.daily[1].temp.max - 273.15) * 9/5 + 32);
        document.getElementById("day-2-high").innerHTML = Math.round((weather.forecast.daily[2].temp.max - 273.15) * 9/5 + 32);
        document.getElementById("day-3-high").innerHTML = Math.round((weather.forecast.daily[3].temp.max - 273.15) * 9/5 + 32);
        document.getElementById("day-4-high").innerHTML = Math.round((weather.forecast.daily[4].temp.max - 273.15) * 9/5 + 32);
        document.getElementById("day-5-high").innerHTML = Math.round((weather.forecast.daily[5].temp.max - 273.15) * 9/5 + 32);
        document.getElementById("day-6-high").innerHTML = Math.round((weather.forecast.daily[6].temp.max - 273.15) * 9/5 + 32);
        document.getElementById("day-7-high").innerHTML = Math.round((weather.forecast.daily[7].temp.max - 273.15) * 9/5 + 32);
    
        document.getElementById("day-1-low").innerHTML = Math.round((weather.forecast.daily[1].temp.min - 273.15) * 9/5 + 32);
        document.getElementById("day-2-low").innerHTML = Math.round((weather.forecast.daily[2].temp.min - 273.15) * 9/5 + 32);
        document.getElementById("day-3-low").innerHTML = Math.round((weather.forecast.daily[3].temp.min - 273.15) * 9/5 + 32);
        document.getElementById("day-4-low").innerHTML = Math.round((weather.forecast.daily[4].temp.min - 273.15) * 9/5 + 32);
        document.getElementById("day-5-low").innerHTML = Math.round((weather.forecast.daily[5].temp.min - 273.15) * 9/5 + 32);
        document.getElementById("day-6-low").innerHTML = Math.round((weather.forecast.daily[6].temp.min - 273.15) * 9/5 + 32);
        document.getElementById("day-7-low").innerHTML = Math.round((weather.forecast.daily[7].temp.min - 273.15) * 9/5 + 32);

    } )
} )