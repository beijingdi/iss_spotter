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

module.exports = { fetchMyIP,fetchCoordsByIP};



/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */