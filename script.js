// api key e42f2703bee5405092192213231311
let inputlocation=document.querySelector(".location");
let loadedlocation="aalst belgium";
const getDayName = (dayType, dateVal = dateObj) => dateVal.toLocaleDateString('en-US', {weekday: dayType})

inputlocation.addEventListener("keyup",(e)=>{
  if(e.key=="Enter"){
    loadedlocation=inputlocation.value;
    console.log(inputlocation.value);
    weather();
    // forecast();
  }
})
weather();

function weather(){
  fetch(('https://api.weatherapi.com/v1/current.json?key=e42f2703bee5405092192213231311&q='+loadedlocation+'&aqi=no'))
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let main=document.body.querySelector("main");
    main.innerHTML=[];
    
    let location=document.createElement("div");
    location.textContent=data.location.name+', '+data.location.country+", "+data.location.localtime;
    let weather=document.createElement("div");
    weather.textContent=data.current.condition.text;
    let weatherimg=document.createElement("img");
    weatherimg.src=data.current.condition.icon;
    let temperature=document.createElement("div");
    temperature.textContent=data.current.temp_c+"°C";
    
    main.appendChild(location);
    main.appendChild(weather);
    main.appendChild(weatherimg);
    main.appendChild(temperature);
    
  })
  .catch(error => {
    // Handle the error
  });
}
function forecast(){
  fetch(('https://api.weatherapi.com/v1/forecast.json?key=e42f2703bee5405092192213231311&q='+loadedlocation+'&days=10&aqi=no&alerts=no'))
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let main=document.body.querySelector("main");
    main.innerHTML=[];
    
    let location=document.createElement("div");
    location.textContent=data.location.name+', '+data.location.country+", "+data.location.localtime;
    let weather=document.createElement("div");
    weather.textContent=data.current.condition.text;
    let weatherimg=document.createElement("img");
    weatherimg.src=data.current.condition.icon;
    let temperature=document.createElement("div");
    temperature.textContent=data.current.temp_c+"°C";
    
    main.appendChild(location);
    main.appendChild(weather);
    main.appendChild(weatherimg);
    main.appendChild(temperature);
    
  })
  .catch(error => {
    // Handle the error
  });
}