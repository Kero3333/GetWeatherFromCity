require("dotenv").config();
const axios = require("axios");

const getTemp = async (latt, long, city) => {
  try {
    const urlTemp = `http://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&appid=${process.env.API_Key}`;
    const {
      data: {
        main: { temp },
      },
    } = await axios(urlTemp);
    const tempC = Math.floor(temp - 273.15);
    return tempC;
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = getTemp;
