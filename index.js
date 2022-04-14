const request = require('request');
const { fetchMyIP,fetchCoordsByIP } = require('./iss');
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  fetchCoordsByIP (ip, (error,geo) =>{
    if (error) {
      console.log(error);
    }
    if (geo){
      console.log(geo)
    }
  })

  console.log('It worked! Returned IP:' , ip);
});






