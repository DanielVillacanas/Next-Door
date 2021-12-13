const axios = require("axios");

class APIMapBox {
  constructor() {
    this.app = axios.create({
      baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
      withCredentials: true,
    });
    this.map = axios.create({
      baseURL: "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/",
      withCredentials: true,
    });
  }

  getCoordinates = (placeName) => {
    return this.app.get(`/${placeName}.json?limit=1&access_token=${process.env.MAP_KEY}`);
  };
  getMap = (coordinates) => {
    return this.map.get(
      `pin-l-a+0B4(${coordinates[0]},${coordinates[1]})/${coordinates[0]},${coordinates[1]},15,0,60/400x400?access_token=${process.env.MAP_KEY}`
    );
  };
}

module.exports = { APIMapBox };
