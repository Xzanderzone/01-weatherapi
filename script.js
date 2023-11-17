// localStorage previous visit city
let loadedlocation = localStorage.getItem('loadedlocation'); 
let loadedweather = localStorage.getItem('loadedweather');
loadedweather = JSON.parse(loadedweather);
if(!loadedlocation)loadedlocation="aalst belgium";

let errormsg=document.querySelector("h1");
let inputlocation=document.querySelector(".location");
const daysofweek=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
const months=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
let chart;

inputlocation.addEventListener("keyup",(e)=>{
  if(e.key=="Enter"){
    loadedlocation=inputlocation.value;
    localStorage.setItem('loadedlocation', inputlocation.value);
    GetWeatherApi();
    GetImageApi();
  }
})
document.querySelector(".search").addEventListener("click",(e)=>{
    loadedlocation=inputlocation.value;
    localStorage.setItem('loadedlocation', inputlocation.value);
    GetWeatherApi();
    GetImageApi();
})

weather();
forecast();

async function GetImageApi(){
 fetch(`https://api.unsplash.com/search/photos?query=${loadedlocation}&client_id=JF1bdAUipsoXUPLcdHgbOjtSQM8S7FcTctwBo1ZcilI`)
 .then(response => response.json())
 .then(data => {
  // console.log(loadedlocation);
  console.log(data.results);
  document.querySelector("main").style.backgroundImage=`url(${data.results[5].urls.raw}&w=1000&dpr=2)`;
})
}

function GetWeatherApi(){
    fetch(('https://api.weatherapi.com/v1/forecast.json?key=e42f2703bee5405092192213231311&q='+loadedlocation+'&days=14&aqi=no&alerts=no'))
  .then(response => response.json())
  .then(data => {
    loadedweather=data;
    localStorage.setItem('loadedweather', JSON.stringify(data));//add > use previous data if new one cant load
    errormsg.textContent="";
    document.body.querySelector("header").prepend(errormsg); 
    weather();
    forecast();
  })
  .catch(error => {
    console.log(error);
    if(error !=200){
      errormsg.textContent="failed to load current weather! Showing previous successfull search ( "+loadedlocation+" )";
      document.body.querySelector("header").prepend(errormsg); 
    } 
  });

}
function weather(){

  let main=document.body.querySelector(".weather");
  main.innerHTML=[];
  let location=document.createElement("div");
  location.style.padding="20px";    
  let time=new Date(loadedweather.location.localtime);
  location.textContent=loadedweather.location.name+', '+loadedweather.location.country+", Today "+daysofweek[time.getDay()]+" "+time.getDate()+" "+months[time.getMonth()]+" "+time.getHours()+":"+time.getMinutes();
  let weather=document.createElement("p");
  weather.textContent=loadedweather.current.condition.text;
  let weatherimgdiv=document.createElement("div");
  weatherimgdiv.style.padding="20px";
  let weatherimg=document.createElement("img");
  weatherimg.src=loadedweather.current.condition.icon;
  let temperature=document.createElement("div");
  temperature.style.padding="20px";
  let text=document.createElement("p");
  text.textContent="Temp: "+loadedweather.current.temp_c+"°C";
  let rain=document.createElement("p");
  let currenthour=time.getHours();
  let datacurrenthour=loadedweather.forecast.forecastday[0].hour[currenthour];
  rain.textContent="Rain: "+datacurrenthour.chance_of_rain+"%";
  let wind=document.createElement("p");
  wind.textContent="Wind: "+loadedweather.current.wind_kph+"kph";
  
  let extrainfo=document.createElement("div");
  extrainfo.style.padding="20px";
  let texti=document.createElement("p");
  texti.textContent="Feels like: "+datacurrenthour.feelslike_c+"°C";
  let raini=document.createElement("p");
  raini.textContent="precip: "+datacurrenthour.precip_mm+"mm";
  let windi=document.createElement("p");
  // console.log(datacurrenthour);
  windi.textContent="Wind direction: "+datacurrenthour.wind_dir;
  
  let extraextrainfo=document.createElement("div");
  extraextrainfo.style.padding="20px";
  let textii=document.createElement("p");
  textii.textContent="UV index: "+datacurrenthour.uv;
  let rainii=document.createElement("p");
  rainii.textContent="Humidity: "+datacurrenthour.humidity+"%";
  let windii=document.createElement("p");
  // console.log(datacurrenthour);
  windii.textContent="Snow: "+datacurrenthour.chance_of_snow+"%";

  //chart
  let charthours=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  let chartvalues=[];
  for(let i=0;i<charthours.length;i++)chartvalues.push(loadedweather.forecast.forecastday[0].hour[i].temp_c);
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
}

function forecast(){
  let main=document.body.querySelector(".forecast");
  let tabcount=0;
    main.innerHTML=[];
    loadedweather.forecast.forecastday.forEach(element => {
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
      temperature.textContent=element.day.daily_chance_of_rain+" %  "+loadedweather.current.temp_c+" °C ";

      let hourlydiv=document.createElement("div");
      hourlydiv.classList.add("hourlyweather");
      hourlydiv.tabIndex=tabcount;
      // tabcount++;
      element.hour.forEach(hourly => {
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
  // })
  // .catch(error => {
  //   // Handle the error
  // });
}

function drawChart(hours,values)
{
  const canvas = document.getElementById("myChart");
  const ctx = canvas.getContext("2d");
  if(chart)chart.destroy();
  chart=new Chart(ctx, {
    type: 'line',
    data: {
      labels: hours,
      datasets: [{
        label: 'Temperature Today',
        borderColor:'red',
        color:'red',
        data: values,
        borderWidth: 2
      }]
    },
    defaults:{
      color:"red  "
    },
    options: {
      legend: {
        labels: {
            fontColor: "red",
            fontSize: 18
        }
      },
      color:"red",
      scales: {
        y:{
          beginAtZero: true,
          ticks: {
            color: 'red', // Change the color of the y-axis labels
            fontWeight : 900,
          },
        },
        x: {
          ticks: {
            color: 'red', // Change the color of the y-axis labels
            fontSize : 40,
          },
        }
      }
    }
  });
}