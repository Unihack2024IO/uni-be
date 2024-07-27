
import { getForecastOnDay } from "./Forecast.js";
import { getPrompt, getTourSuggestPrompt } from "./prompt.service.js";
import { getGeminiAns } from "./gemini.service.js";
import { getDestination } from "./destination.service.js";
import { getActivity } from "./activity.service.js";
import { getStop } from "./stop.service.js"; 
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
const randomAddress = ["Sơn Trà, Đà Nẵng", "Ngũ Hành Sơn, Đà Nẵng", "Hải Châu, Đà Nẵng", "Thanh Khê, Đà Nẵng", "Liên Chiểu, Đà Nẵng", "Cẩm Lệ, Đà Nẵng", "Hòa Vang, Đà Nẵng", "Hoàng Sa, Đà Nẵng"];
const randomRating = ["4.5", "4.6", "4.7", "4.8", "4.9", "5.0"];
const getActivityList = async (listActivityId) => {
  if (!listActivityId) {
    return [];
  }
  listActivityId = JSON.parse(listActivityId);
  const listActivity = [];
  for (const activityId of listActivityId) {
    const activity = (await getActivity(activityId)).data;
    listActivity.push({
      id: activity.id,
      time: activity.time,
      name: activity.name,
      type: activity.type,
      entryFee: activity.entryFee,
      imageUrl: activity.imageUrl, 
    });
  }
  return listActivity;
}

const getStopList = async (listStopId) => {
  if (!listStopId) {
    return [];
  }
  listStopId = JSON.parse(listStopId);

  const listStop = [];
  for (const stopId of listStopId) {
    const stop = (await getStop(stopId)).data;
    listStop.push({
      id : stop.id,
      name: stop.name,
      address: stop.address,
      priceRange : stop.priceRange,
      images: stop.images, // Access the specific property
      imageUrl: stop.images[0],
      openingHours: stop.openingHours,
    });
  }
  return listStop;
}



export const getTourAdvisers = async (arriveTime, endTime, listActivityId, listStopId) => {
  try {
  const stops = await getStopList(listStopId);
  const activities = await getActivityList(listActivityId);
  const prompt = await getTourSuggestPrompt(arriveTime, endTime, activities, stops);
  const geminiAns = await getGeminiAns(prompt);
  return geminiAns;
  }
  catch (error) {
    console.log(error);
    throw error;
  }



}

