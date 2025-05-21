import './styles.css'

document.querySelector("form").addEventListener('submit', (e)=>{
    e.preventDefault();
    search_weather();
})

async function search_weather(e){
    const input = document.querySelector("input").value.trim();
    if(!input)return;
    try{
        const reponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?unitGroup=metric&key=DFPLPPTJH58DQH2RZQLGGM2SN`,
            {mode: 'cors'});
        

        const data = await reponse.json();
            
        const card = document.getElementById("weather-card");
        card.innerHTML = `
        <h2>${data.address}</h2>
        <h3> details for the following days </h3>
        <p>${data.description}</p>
        <p><strong>Timezone:</strong> ${data.timezone}</p>
        <img class="weather-icon" src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${data.currentConditions.icon}.png" alt="${data.currentConditions.conditions}" />

        <div class="info"><span class="icon">🌡️</span>Temperature: ${data.currentConditions.temp}°</div>
        <div class="info"><span class="icon">☁️</span>Cloud Cover: ${data.currentConditions.cloudcover}%</div>
        <div class="info"><span class="icon">💧</span>Humidity: ${data.currentConditions.humidity}%</div>
        <div class="info"><span class="icon">👁️</span>Visibility: ${data.currentConditions.visibility} km</div>
        <div class="info"><span class="icon">🌧️</span>Precipitation Probability: ${data.currentConditions.precipprob}%</div>
        <div class="info"><span class="icon">🌂</span>Precipitation Type: ${data.currentConditions.preciptype ?? "None"}</div>
        <div class="info"><span class="icon">📋</span>Conditions: ${data.currentConditions.conditions}</div>
        `;

      
      
        // console.log(
        //     data.address,
        //     data.description,
        //     data.timezone,
        //     data.currentConditions.cloudcover,
        //     data.currentConditions.conditions,
        //     data.currentConditions.humidity,
        //     data.currentConditions.icon,
        //     data.currentConditions.temp,
        //     data.currentConditions.visibility,
        //     data.currentConditions.precipprob,
        //     data.currentConditions.preciptype,

        // );
        // console.log(data);

        //what i will use

        //data.address
        //data.description  describing weather for coming remaining days
        //data.timezone 
        //data.currentConditions.cloudcover = number
        //data.currentConditions.conditions = string  . 
        //data.currentConditions.humidity = number
        //data.currentConditions.icon = string
        // data.currentConditions.temp
        // data.currentConditions.visibility
        // data.currentConditions.precipprob = number but add % showing probability of rain
        // data.currentConditions.preciptype = string/null (rain/snow/ice).


    }catch{
        const card = document.getElementById("weather-card");
        card.innerHTML = `<h6>failed to load details</h6>`;
    }finally{
        console.log("process finished")
    }
}