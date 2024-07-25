const search = document.getElementById('search');
const city = document.querySelector('input');
const container = document.getElementById('weather-report');
const containerImage = document.getElementById('container-image');
async function getWeather(url){
    try{
        const response = await fetch(url,{mode: 'cors'});
        if(!response.ok){
             container.textContent = '';
             containerImage.style.backgroundImage = 'none';
             city.value = '';
             alert('Bad request, Error: 400');
        }else{
        data = await response.json();
        console.log(data);
        displayData(data);
        }

    }catch(error){
            console.error(' Fetch error occured  ',error);
    }
}
function displayData(data){
    const address = data.resolvedAddress;
    const conditions = data.currentConditions.conditions;
    const cloudCover = data.currentConditions.cloudcover;
    const dateTime = data.currentConditions.datetime;
    const dew = data.currentConditions.dew;
    const feelsLike = data.currentConditions.feelslike;
    const humidity = data.currentConditions.humidity;
    const sunrise = data.currentConditions.sunrise;
    const sunset = data.currentConditions.sunset;
    const temp = data.currentConditions.temp;
    const timezone = data.timezone;

    container.innerHTML =  `<b>
                            Address: ${address}<br>
                            Conditions : ${conditions}<br>
                            cloudCover : ${cloudCover}<br>
                            Time : ${dateTime}<br>
                            dew : ${dew}<br>
                            feelsLike : ${feelsLike}<br>
                            humidity: ${humidity}<br>
                            sunrise : ${sunrise}<br>
                            sunset : ${sunset}<br>
                            temp: ${temp} F<br>
                            timezone : ${timezone}</b>
                            `
    const icon = data.currentConditions.icon;
    if(icon === 'partly-cloudy-day'){
        containerImage.style.backgroundImage = 'url("cloudy day.jpeg")';
        containerImage.style.backgroundSize = 'cover';
    }else if(icon === 'clear-day'){
        containerImage.style.backgroundImage = 'url("clear day.jpeg")';
        containerImage.style.backgroundSize = 'cover';
    }else if(icon === 'partly-cloudy-night'){
        containerImage.style.backgroundImage = 'url("coudy night.jpeg")';
        containerImage.style.backgroundSize = 'cover';
    }
}
search.addEventListener('click',(event) => {
    event.preventDefault();
    console.log('hi');
    const url =  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.value}?key=92CVDYYK64MZWH24UAPHCWAEX`;
    getWeather(url);
});