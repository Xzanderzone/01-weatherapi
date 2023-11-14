// api key e42f2703bee5405092192213231311
let inputlocation=document.querySelector(".location");
let loadedlocation="aalst belgium";
const getDayName = (dayType, dateVal = dateObj) => dateVal.toLocaleDateString('en-US', {weekday: dayType})
const daysofweek=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
const months=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

inputlocation.addEventListener("keyup",(e)=>{
  if(e.key=="Enter"){
    loadedlocation=inputlocation.value;
    console.log(inputlocation.value);
    weather();
    forecast();
  }
})
weather();
forecast();

function weather(){
  fetch(('https://api.weatherapi.com/v1/current.json?key=e42f2703bee5405092192213231311&q='+loadedlocation+'&aqi=no'))
  .then(response => response.json())
  .then(data => {
    let main=document.body.querySelector(".weather");
    main.innerHTML=[];
    
    let location=document.createElement("div");
    let time=new Date(data.location.localtime);
    location.textContent=data.location.name+', '+data.location.country+", Today "+daysofweek[time.getDay()]+" "+time.getDate()+" "+months[time.getMonth()];
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
    let main=document.body.querySelector(".forecast");
    main.innerHTML=[];
    
    console.log(data.forecast.forecastday[0]);
    data.forecast.forecastday.forEach(element => {
      let forecastday=document.createElement("div");
      forecastday.classList.add("day");
      forecastday.style.backgroundImage="./forecastexample.png";
      const day=new Date(element.date);
      forecastday.textContent=daysofweek[day.getDay()]+" "+day.getDate() +" "+ months[day.getMonth()];
      let weather=document.createElement("div");
      weather.textContent=element.day.condition.text;
      weather.style.height='10vh';
      weather.style.color="rgb(200,200,200)";
      let weatherimg=document.createElement("img");
      weatherimg.src=element.day.condition.icon;
      weatherimg.style.float="left";
      weatherimg.style.height="100%";
      let temperature=document.createElement("p");
      temperature.textContent=element.day.daily_chance_of_rain+" %  "+data.current.temp_c+" °C ";

      let hourlydiv=document.createElement("div");
      hourlydiv.classList.add("hourlyweather");
      element.hour.forEach(hourly => {
        console.log(hourly);
        let hour=document.createElement("div");
        hour.classList.add("hour");
        hour.style.minWidth="100px";
        let hourlyimg=document.createElement("img");
        let condition=document.createElement("p");
        condition.style.marginLeft="5px";
        condition.style.marginRight="5px";
        let temp=document.createElement("p");
        temp.textContent=hourly.temp_c+" °C";
        let time=document.createElement("p");
        time.textContent=hourly.time.substring(10,16);
        condition.textContent=hourly.condition.text;
        hourlyimg.src=hourly.condition.icon;
        hour.appendChild(hourlyimg);
        hour.appendChild(time);
        hour.appendChild(temp);
        hour.appendChild(condition);
        hourlydiv.appendChild(hour);
      });
      forecastday.appendChild(weatherimg);
      forecastday.appendChild(temperature);
      forecastday.appendChild(weather);
      forecastday.appendChild(hourlydiv);
      main.appendChild(forecastday);
    });
    
  })
  .catch(error => {
    // Handle the error
  });
}