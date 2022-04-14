const request = require('request');

const apiKey = '562cebb0-bc26-11ec-8a2f-e5333b4e1cb6'

const fetchMyIP = (cb) => {
  request(`https://api.ipify.org?format=json`, (error,response,body) => {
    if (error) {
      cb(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }

    let ip = JSON.parse(body)["ip"];
    cb(null,ip);
  });
};


const fetchCoordsByIP = (ip,cb) => {
request(`https://api.freegeoip.app/json/${ip}?apikey=${apiKey}`, (error,response,body) => {
    if (error) {
      cb(error);
  }
    const parsed = JSON.parse(body)
    const geo = {
      latitude: parsed.latitude,
      longitude: parsed.longitude
    }
    cb(geo);
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
 const fetchISSFlyOverTimes = (coords, cb) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords['latitude']}&lon=${coords['longitude']}`, (error,response,body) =>{
    if (error) {
      cb(error);
    }
    const parsedFlyover = JSON.parse(body);
    const flyOver = parsedFlyover["response"];
    cb(flyOver);
  });
};
module.exports = { fetchMyIP,fetchCoordsByIP,fetchISSFlyOverTimes };





/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */