require('dotenv').config();
const axios = require('axios');
const { response } = require('express');


const getForecast = async (location) => {
    try {
        const URL = process.env.OpenWeatherMap_URL;
        const API_KEY = process.env.OpenWeatherMap_API_KEY;
        const API = URL + `?lat=${location.lat}&lon=${location.lon}&exclude=daily&appid=${API_KEY}`;
        const response = await axios.get(API);
        const data =  response.data.list;
        //extract the data we need
        const forecast = data.map((item) => {
            return {
                date: item.dt_txt,
                main : item,
                weather : {
                    main : item.weather[0].main,
                    description : item.weather[0].description,
                },
                clouds : item.clouds.all,
                wind : item.wind,
                visibility : item.visibility,

                
            }});
    
        return forecast;
        

    }
    catch (error) {
        console.log(error);
    }
}
const getForecastOnDay = async (location, day) => {
    try {
        const data = await getForecast(location);
        const forecast = data.filter((item) => {
            const forecastDate = new Date(item.date);
            return forecastDate.getDate() === day;
        });
        return forecast;
        
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = { getForecast, getForecastOnDay};