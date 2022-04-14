const request = require('request');
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
    cb(error,ip);
  });
};

module.exports = { fetchMyIP };




/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */