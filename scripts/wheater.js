const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const url = 'https://api.openweathermap.org/data/2.5/weather?lat={49.75}&lon={6.64}&appid={33e46cf43f8cb560e1bfb1388abe3418}'

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);

        } else {
            throw Error(await response.text());
        }
    }catch (error) {
        console.log(error);
    }
    
}

apiFetch();