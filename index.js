const request = require('request');
const { fetchMyIP,fetchCoordsByIP,ISSFlyOverTimes } = require('./iss');
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  fetchCoordsByIP (ip, (error,geo) =>{
    if (error) {
      console.log(error);
      return;
    }
    ISSFlyOverTimes(geo,(error,flyover) => {
      if(error) {
        console.log(error);
        return;
      }
      console.log(flyover);
      return flyover;

    });
  });
  
});

 





