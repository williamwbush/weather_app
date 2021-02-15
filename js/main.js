const form = document.querySelector('#location_form')

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
        document.getElementById('city').innerHTML = weather.current_weather.name;
        document.getElementById('wind').innerHTML = Math.round(weather.current_weather.wind.speed * 2.237); 
        document.getElementById('feels-like').innerHTML = Math.round((weather.current_weather.main.feels_like - 273.15) * 9 / 5 + 32);
        document.getElementById('current-temp').innerHTML = Math.round((weather.current_weather.main.temp - 273.15) * 9 / 5 + 32); 
        document.getElementById('humidity').innerHTML = weather.current_weather.main.humidity + "%";
        document.getElementById("icon-image-1").src = `http://openweathermap.org/img/wn/${weather.current_weather.weather[0].icon}@2x.png`;
        document.getElementById("icon-image-2").src = ""
        if(weather.current_weather.weather[1]){
            document.getElementById("icon-image-2").src = `http://openweathermap.org/img/wn/${weather.current_weather.weather[1].icon}@2x.png`;
        }
        document.getElementById("icon-image-3").src = `http://openweathermap.org/img/wn/${weather.forecast.daily[1].weather[0].icon}@2x.png`;
        document.getElementById("icon-image-4").src = `http://openweathermap.org/img/wn/${weather.forecast.daily[2].weather[0].icon}@2x.png`;
        document.getElementById("icon-image-5").src = `http://openweathermap.org/img/wn/${weather.forecast.daily[3].weather[0].icon}@2x.png`;
        document.getElementById("icon-image-6").src = `http://openweathermap.org/img/wn/${weather.forecast.daily[4].weather[0].icon}@2x.png`;
        document.getElementById("icon-image-7").src = `http://openweathermap.org/img/wn/${weather.forecast.daily[5].weather[0].icon}@2x.png`;
        document.getElementById("icon-image-8").src = `http://openweathermap.org/img/wn/${weather.forecast.daily[6].weather[0].icon}@2x.png`;
        document.getElementById("icon-image-9").src = `http://openweathermap.org/img/wn/${weather.forecast.daily[7].weather[0].icon}@2x.png`;

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
        let d = weather.forecast.current.dt
        let day2 = days[(d.getDay() + 2) % 7];
        console.log(day2)

        document.getElementById("day-2").innerHTML = day2
    }

    _displayWeather()
} )