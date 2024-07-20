const { getForecast, getForecastOnDay } = require('./Forecast');
const destination = {
  name: 'Cầu Sông Hàn',
  priceRange: '0',
  transportation: {
    modes: ['Bus', 'Taxi', 'Bike'],
    convenience: 'High'
  },
  attractions: ['Sông Hàn Bridge', 'City Lights View'],
  cuisine: ['Vietnamese', 'Seafood'],
  recreationalActivities: ['Boat Rides', 'Walking Tours'],
  safetyAndSecurity: {
    status: 'Safe',
    measures: ['Police Patrol', 'CCTV'],
    advice: ['Avoid late night walks alone']
  },
  localCultureAndCustoms: {
    etiquette: ['Respect local customs', 'Dress modestly'],
    traditionalFestivals: ['Da Nang Fireworks Festival'],
    specialties: ['Fresh Seafood', 'Bánh xèo']
  },
  idealWeather: {
    averageTemperature: '27°C',
    condition: 'Sunny',
    humidity: '70%',
    wind: 'Light Breeze'
  },
  location: {
    latitude: '16.0659',
    longitude: '108.223'
  },
  accommodations: ['Riverside Hotel', 'City Inn'],
  popularTimes: ['Evenings', 'Weekends'],
  events: [
    {
      destinationId: 1,
      name: 'Da Nang Fireworks Festival',
      time: {
        start: '2024-08-01T20:00:00Z',
        end: '2024-08-01T22:00:00Z'
      },
      description: 'Annual fireworks competition held over the Han River.',
      type: 'Festival',
      imageUrl: 'http://example.com/fireworks.jpg',
      entryFee: 'Free',
      sponsors: ['Local Government', 'Da Nang Tourism'],
      activities: ['Fireworks Display', 'Live Music'],
      contactInfo: {
        phone: '123-456-7890',
        email: 'festival@danang.gov'
      }
    },
    {
      destinationId: 1,
      name: 'Night Market',
      time: {
        start: '2024-07-20T18:00:00Z',
        end: '2024-07-20T23:00:00Z'
      },
      description: 'A bustling night market with local food and crafts.',
      type: 'Market',
      imageUrl: 'http://example.com/nightmarket.jpg',
      entryFee: 'Free',
      sponsors: ['Local Vendors Association'],
      activities: ['Shopping', 'Food Tasting'],
      contactInfo: {
        phone: '098-765-4321',
        email: 'market@songhan.com'
      }
    },
    {
      destinationId: 1,
      name: 'Cầu Rồng Phun Lửa/Nước',
      time: {
        recurrence: {
          daysOfWeek: ['Saturday', 'Sunday'],
          time: '21:30'
        }
      },
      description: 'A spectacular show where the Dragon Bridge breathes fire and water.',
      type: 'Show',
      imageUrl: 'http://example.com/dragonbridge.jpg',
      entryFee: 'Free',
      sponsors: ['Da Nang City Council'],
      activities: ['Fire Show', 'Water Display'],
      contactInfo: {
        phone: '112-233-4455',
        email: 'info@dragonbridge.com'
      }
    }
  ]
};

const User = {
  personalInfo: {
    name: 'John Doe',
    birthDate: '1990-01-01'
  },
  preferences: {
    colorPreferences: ['Blue', 'Green'],
    interests: ['History', 'Cuisine'],
    dislikes: ['Crowds'],
    allergies: ['Peanuts'],
    preferredTravelTime: {
      start: '08:00',
      end: '18:00'
    },
    personality: {
      introvert: true,
      risk_tolerance: 'low',
      patience: 'high',
      adventure_seeker: true
    },
    budget: '$$',
    preferredTravelStyle: ['Solo', 'Adventure'],
    specialRequirements: {
      accommodations: ['Wi-Fi', 'Parking'],
      services: ['Guided Tours', 'Airport Transfers']
    },
    expectations: {
      experience: ['Local Culture', 'Outdoor Activities'],
      service: ['Quality Accommodation', 'Responsive Customer Support']
    }
  },
  healthInfo: {
    condition: ['None'],
    requirements: ['None']
  }
};

const getAdviser = async (user, destination) => {
  try {
    const location = {
      lat: destination.location.latitude,
      lon: destination.location.longitude
    };
    const date = "Thứ Tư 2024-07-24";

    const data = await getForecastOnDay(location,24);
    const actitivities = "Xem cầu rồng phun nước/ lửa";
    const forecast = JSON.stringify(data);
    const question = ` Hãy cho tôi biết tôi có nên tham dự ${actitivities} vào ngày ${date} hay không dựa trên thông tin cá nhân , thông tin về sự kiện, dự báo thời tiết . Hãy cung cấp lời khuyên về việc nên chuẩn bị gì, cần lưu ý điều gì và thời gian lý tưởng để đến tham dự sự kiện. Bên cạnh đó, hãy chia sẻ thêm một số mẹo bổ ích giúp tôi tận hưởng tối đa ${actitivities}`;
    const prompt = `
        {
            
            "task" : {
                "language" : "vi",
                "format" : "json",
                "output_format" : {
                    "recommendation" : true,
                    "preparation" : true,
                    "caution" : true,
                    "ideal_time" : true,
                    "tips" : true
                },
                "question" : "${question}"

                }
            
            },
            information : {
                "user" : ${JSON.stringify(user)},
                "destination" : ${JSON.stringify(destination)},
                "weather" : ${forecast},
            }
        } `;

    return prompt;
  } catch (error) {
    console.log(error);
  }
};
const excute = async (user, destination) => {
  const response = await getAdviser(user, destination);
  console.log(response);
};
excute(User, destination);

//prompt
// {
//   "user": {
//     "name": "John Doe",
//     "location": {
//       "city": "Anytown",
//       "state": "Anystate",
//       "country": "Country"
//     },
//     "interests": ["History", "Cuisine"],
//     "dislikes": ["Crowds"],
//     "preferredTravelTime": {
//       "start": "08:00",
//       "end": "18:00"
//     },
//     "budget": "$$",
//     "preferredTravelStyle": ["Solo", "Adventure"],
//     "specialRequirements": {
//       "accommodations": ["Wi-Fi", "Parking"],
//       "services": ["Guided Tours", "Airport Transfers"]
//     },
//     "personality": {
//       "introvert": true,
//       "risk_tolerance": "low",
//       "patience": "high",
//       "adventure_seeker": true
//     }
//   },
//   "destination": {
//     "name": "Cầu Sông Hàn",
//     "location": {
//       "latitude": "16.0659",
//       "longitude": "108.223"
//     },
//     "events": [
//       {
//         "name": "Da Nang Fireworks Festival",
//         "time": {
//           "start": "2024-08-01T20:00:00Z",
//           "end": "2024-08-01T22:00:00Z"
//         }
//       },
//       {
//         "name": "Night Market",
//         "time": {
//           "start": "2024-07-20T18:00:00Z",
//           "end": "2024-07-20T23:00:00Z"
//         }
//       },
//       {
//         "name": "Cầu Rồng Phun Lửa/Nước",
//         "time": {
//           "recurrence": {
//             "daysOfWeek": ["Saturday", "Sunday"],
//             "time": "21:30"
//           }
//         }
//       }
//     ]
//   },
//   "weather": {
//     "dt": 1721282400, // Timestamp of the weather data (optional, but helpful for context)
//     "main": {
//       "temp": 306.17, // Temperature in Kelvin
//       "feels_like": 313.17 // Feels like temperature in Kelvin
//     },
//     "weather": [
//       {
//         "description": "light rain" // Description of the weather condition
//       }
//     ]
//   },
//   "task": {
//     "language": "vi",
//     "format": "json",
//     "output_format": {
//         "recommendation": true,
//         "preparation": true,
//         "caution": true,
//         "ideal_time": true,
//         "tips": true
//     },
//     "question": "Hãy cho tôi biết John Doe có nên tham dự Lễ hội Pháo hoa Đà Nẵng tại Cầu Sông Hàn hay không dựa trên sở thích của anh ấy, thông tin về sự kiện, dự báo thời tiết và tính cách của anh ấy. Hãy cung cấp lời khuyên về việc nên chuẩn bị gì, cần lưu ý điều gì và thời gian lý tưởng để đến tham dự sự kiện. Bên cạnh đó, hãy chia sẻ thêm một số mẹo bổ ích giúp John Doe tận hưởng tối đa Lễ hội Pháo hoa."
//   }
// }
