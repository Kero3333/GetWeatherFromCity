require("dotenv").config();
const axios = require("axios");
const getTemp = require("./getTemp.js");

const getCoordinate = async (city) => {
  try {
    if (city === "") {
      throw new Error("You have to choose a city");
    }
    const urlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.API_Key}`;
    const { data } = await axios(urlGeo);
    const { lat, lon } = data[0];
    return getTemp(lat, lon, city);
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};
module.exports = getCoordinate;
