fetch('https://api.weatherapi.com/v1/current.json?key=e42f2703bee5405092192213231311&q=aalst belgium&aqi=no',)
  // .then(response => response.json())
  .then(users => {
    console.log(users);
  })
  .catch(error => {
    // Handle the error
  });