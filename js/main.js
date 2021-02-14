const form = document.querySelector('#location_form')
console.log(form)

form.addEventListener('submit', ( event ) => {
    event.preventDefault();
    console.log(event);

    let city_submitted = document.querySelector('#location').value
    
    const _getWeather = async () => {
        let api_key = "0c9275e005544d1d828e0dbe3329e8a8"
    
        let request = new Request(`http://api.openweathermap.org/data/2.5/weather?q=${city_submitted}&appid=${api_key}`);
        let result = await fetch(request);
        let response = await result.json();
        console.log(response)
        return response
    }

    async function _displayWeather(){
        weather = await _getWeather();
        document.getElementById('city').innerHTML = weather.name
        document.getElementById('high').innerHTML = weather.main.temp_max
        document.getElementById('low').innerHTML = weather.main.temp_min
        document.getElementById('forecast').innerHTML = weather.main.temp
        document.getElementById('humidity').innerHTML = weather.main.humidity
    }
   
    _displayWeather();
} )