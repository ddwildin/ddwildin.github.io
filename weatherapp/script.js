const submit = document.getElementById('submit');
const cityInput = document.getElementById('city');
const url = 'https://api.openweathermap.org/data/2.5/weather';
const api = '50bd166b0710492b35a785ec627e9fa5';
const fetchWeather = async () => {
   
    const city = cityInput.value;
    const endpoint = `${url}?q=${city}&APPID=${api}`;
    
try { 
        const response = await fetch(endpoint); 
        if(response.ok) {
            jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        }
        else {
            console.log('Something went wrong.  Check your input');
        }
    } catch(error) {
        console.log(error);
    }
}

const processJson = (data) => {
    const htmlToInsert = 
    `
    <h2>Weather in ${cityInput.value}</h2>
    <ul>
    <li>${data.weather[0].main}</li>
    <li>Current temperature: ${Math.floor(data.main.temp - 273.15)}</li>
    `;
    const pointOfInsertion = document.getElementById('weather');
    pointOfInsertion.innerHTML = htmlToInsert;
}
submit.onclick = (event) => {
    //fetch weather, process it and present it
    event.preventDefault();
    fetchWeather().then(data => processJson(data));
    
};