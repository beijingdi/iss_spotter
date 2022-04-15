const request = require('request');
const { nextISSTimesForMyLocation } = require('./iss');
const { fetchMyIP,fetchCoordsByIP,ISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');




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
      nextISSTimesForMyLocation((error, passTimes) => {
        if (error) {
          return console.log("It didn't work!", error);
        }
        console.log(passTimes);
        return;
      });

    });
  });
  
});



 





