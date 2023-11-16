// api key e42f2703bee5405092192213231311
// localStorage previous visit city
let loadedlocation = localStorage.getItem('loadedlocation'); 
if(!loadedlocation)loadedlocation="aalst belgium";
let inputlocation=document.querySelector(".location");
const daysofweek=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
const months=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];

inputlocation.addEventListener("keyup",(e)=>{
  if(e.key=="Enter"){
    loadedlocation=inputlocation.value;
    localStorage.setItem('loadedlocation', inputlocation.value);
    console.log(inputlocation.value);
    weather();
    forecast();
  }
})
weather();
forecast();

function weather(){
  fetch(('https://api.weatherapi.com/v1/forecast.json?key=e42f2703bee5405092192213231311&q='+loadedlocation+'&days=10&aqi=no&alerts=no'))
  .then(response => response.json())
  .then(data => {
    let main=document.body.querySelector(".weather");
    main.innerHTML=[];
    console.log(data);
    let location=document.createElement("div");
    location.style.padding="20px";
    let time=new Date(data.location.localtime);
    location.textContent=data.location.name+', '+data.location.country+", Today "+daysofweek[time.getDay()]+" "+time.getDate()+" "+months[time.getMonth()]+" "+time.getHours()+":"+time.getMinutes();
    let weather=document.createElement("p");
    weather.textContent=data.current.condition.text;
    let weatherimgdiv=document.createElement("div");
    weatherimgdiv.style.padding="20px";
    let weatherimg=document.createElement("img");
    weatherimg.src=data.current.condition.icon;
    let temperature=document.createElement("div");
    temperature.style.padding="20px";
    let text=document.createElement("p");
    text.textContent="Temp: "+data.current.temp_c+"°C";
    let rain=document.createElement("p");
    let currenthour=time.getHours();
    let datacurrenthour=data.forecast.forecastday[0].hour[currenthour];
    rain.textContent="Rain: "+datacurrenthour.chance_of_rain+"%";
    let wind=document.createElement("p");
    wind.textContent="Wind: "+data.current.wind_kph+"kph";
    
    let extrainfo=document.createElement("div");
    extrainfo.style.padding="20px";
    let texti=document.createElement("p");
    texti.textContent="Feels like: "+datacurrenthour.feelslike_c+"°C";
    let raini=document.createElement("p");
    raini.textContent="precip: "+datacurrenthour.precip_mm+"mm";
    let windi=document.createElement("p");
    console.log(datacurrenthour);
    windi.textContent="Wind direction: "+datacurrenthour.wind_dir;
    
    let extraextrainfo=document.createElement("div");
    extraextrainfo.style.padding="20px";
    let textii=document.createElement("p");
    textii.textContent="UV index: "+datacurrenthour.uv;
    let rainii=document.createElement("p");
    rainii.textContent="Humidity: "+datacurrenthour.humidity+"%";
    let windii=document.createElement("p");
    console.log(datacurrenthour);
    windii.textContent="Snow: "+datacurrenthour.chance_of_snow+"%";

    let charthours=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    let chartvalues=[];
    for(let i=0;i<charthours.length;i++)chartvalues.push(data.forecast.forecastday[0].hour[i].temp_c);
    drawChart(charthours,chartvalues);
    
    main.appendChild(location);
    weatherimgdiv.appendChild(weather);
    weatherimgdiv.appendChild(weatherimg);
    main.appendChild(weatherimgdiv);

    temperature.appendChild(text);
    temperature.appendChild(rain);
    temperature.appendChild(wind);
    main.appendChild(temperature);

    extrainfo.appendChild(texti);
    extrainfo.appendChild(raini);
    extrainfo.appendChild(windi);
    main.appendChild(extrainfo);

    extraextrainfo.appendChild(textii);
    extraextrainfo.appendChild(rainii);
    extraextrainfo.appendChild(windii);
    main.appendChild(extraextrainfo);
    
  })
  .catch(error => {
    // Handle the error
  });
}
function forecast(){
  fetch(('https://api.weatherapi.com/v1/forecast.json?key=e42f2703bee5405092192213231311&q='+loadedlocation+'&days=10&aqi=no&alerts=no'))
  .then(response => response.json())
  .then(data => {
    let main=document.body.querySelector(".forecast");
    main.innerHTML=[];
    data.forecast.forecastday.forEach(element => {
      let forecastday=document.createElement("div");
      forecastday.classList.add("day");
      forecastday.style.padding="20px";
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
        // console.log(hourly);
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

function drawChart(hours,values)
{
  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: hours,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: 'Temperature',
        data: values,//[12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}