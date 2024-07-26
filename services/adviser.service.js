
import { getForecastOnDay } from "./Forecast.js";
import { getPrompt } from "./prompt.service.js";
import { getGeminiAns } from "./gemini.service.js";
const getWeekDay = (time) => {
  const date = new Date(time);
  const weekDay = date.getDay();
  const day = new Date(time).getDay();
  switch (day) {
    case 0:
      return 'Chủ Nhật';
      break;
    case 1:
      return 'Thứ hai';
      break;
    case 2:
      return 'Thứ ba';
      break;
    case 3:
      return 'Thứ tư';
    case 4:
      return 'Thứ năm';
      break;
    case 5:
      return 'Thứ sáu';
      break;
    case 6:
      return 'Thứ bảy';
      break;
  }
  return weekDay;
};

export const getAdvisers = async (User, Destination, Activity, time) => {

  const location = {
    lat: Destination.location.latitude,
    lon: Destination.location.longitude
  };
  const date = new Date(time).getDate();
  const forecast = await getForecastOnDay(location, date);

  const prompt = await getPrompt(User, Destination, getWeekDay(time) +" " + time, Activity, forecast);
  console.log(prompt);
  const geminiAns = await getGeminiAns(prompt);
  return geminiAns;
};
