const axios = require("axios");
const getTemp = require("./getTemp.js");

const getCoordinate = async (city) => {
  try {
    if (city === "") {
      throw new Error("You have to choose a city");
    }
    const urlGeo = `https://geocode.xyz/${city}?json=1`;
    const {
      data: { longt, latt },
    } = await axios(urlGeo);
    return getTemp(latt, longt, city);
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
};
module.exports = getCoordinate;
