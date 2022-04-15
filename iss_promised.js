const request = require('request-promise-native');
const apiKey = '562cebb0-bc26-11ec-8a2f-e5333b4e1cb6';

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};



const fetchCoordsByIP = function(body) {
 return request(`https://api.freegeoip.app/json/${JSON.parse(body)["ip"]}?apikey=${apiKey}`);
}


const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};


const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};



module.exports = {nextISSTimesForMyLocation};