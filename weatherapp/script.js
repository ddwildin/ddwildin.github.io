const submit = document.getElementById('submit');
const cityInput = document.getElementById('city');

const url = 'https://api.openweathermap.org/data/2.5/weather';
const api = '50bd166b0710492b35a785ec627e9fa5'

const fetchWeather = async () => {
    const city = cityInput.value;
    //const endpoint = `${url}?q=${city}&APPID=${api}`;
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=c7a0d4b613eb9e648c1a0f06cf8b9ece'; 
    try {
        const response = await fetch(endpoint);
        if(response.ok) {
            jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch(error) {
        console.log(error.message);
    }
}
submit.onclick = () => {
    //fetch weather, process it and present it
    fetchWeather();
};