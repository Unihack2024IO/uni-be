const prompt = {
  task: {
    language: 'vi',
    format: 'json',
    question:
      'Tôi đang ở địa điểm Gợi ý cho tôi những Stops phù hợp với tôi. Kèm theo affiliate_link trong thẻ <Link color="teel.500" href="stop.affiliate_link"> stop.name</Link> ở kết quả trả về. Thêm query param `affid=123` vào affiliate_link',
  },    
    ui : "chakra-ui",
    aid : "123123",
    response_schema :{
        "answers" : "",
        "stops" : []
    },
  stops: [
    {
        "images": [
            "khach_san_sunrise1.jpg",
            "khach_san_sunrise2.jpg",
            "khach_san_sunrise3.jpg"
        ],
        "address": "123 Đường Bạch Đằng, Hải Châu, Đà Nẵng, Vietnam",
        "name": "Khách Sạn Sunrise Đà Nẵng",
        "services": [
            "Dịch vụ phòng",
            "Bãi đỗ xe",
            "Wi-Fi miễn phí",
            "Hồ bơi",
            "Spa",
            "Nhà hàng",
            "Phòng tập gym"
        ],
        "affiliate_link": "www.example.com?affid=123",
        "rating": "4.8",
        "openingHours": [
            {
                "time": {
                    "end": "12:00 AM",
                    "start": "12:00 AM"
                },
                "day": "Thứ hai"
            },
            {
                "day": "Thứ ba",
                "time": {
                    "start": "12:00 AM",
                    "end": "12:00 AM"
                }
            },
            {
                "day": "Thứ tư",
                "time": {
                    "end": "12:00 AM",
                    "start": "12:00 AM"
                }
            },
            {
                "time": {
                    "start": "12:00 AM",
                    "end": "12:00 AM"
                },
                "day": "Thứ năm"
            },
            {
                "day": "Thứ sáu",
                "time": {
                    "start": "12:00 AM",
                    "end": "12:00 AM"
                }
            },
            {
                "time": {
                    "end": "12:00 AM",
                    "start": "12:00 AM"
                },
                "day": "Thứ bảy"
            },
            {
                "day": "Chủ nhật",
                "time": {
                    "start": "12:00 AM",
                    "end": "12:00 AM"
                }
            }
        ],
        "location": {
            "latitude": "16.067789",
            "longitude": "108.218914"
        },
        "description": "Khách Sạn Sunrise Đà Nẵng là một địa điểm nghỉ dưỡng lý tưởng tại trung tâm thành phố Đà Nẵng. Với phòng ốc sang trọng, tiện nghi hiện đại, và dịch vụ chuyên nghiệp, khách sạn mang đến cho du khách một trải nghiệm nghỉ ngơi tuyệt vời.",
        "phone": "+84 236 1234 567",
        "priceRange": "1.000.000VND-5.000.000VND",
        "email": "info@sunrisedanang.com",
        "reviews": [
            "Phòng sạch sẽ và thoải mái!",
            "Dịch vụ tuyệt vời và nhân viên thân thiện.",
            "Vị trí thuận lợi, gần các điểm tham quan."
        ],
        "type": "Khách sạn",
        "id": "7HLt61vR5fvudtBYdeAA"
    },
    {
        "rating": "4.7",
        "description": "The Anchor Restaurant & Bierhaus Trần Phú là một địa điểm ăn uống và uống bia phổ biến nằm ở trung tâm Đà Nẵng. Nơi đây cung cấp một loạt các món ăn lấy cảm hứng từ ẩm thực Đức, các loại bia thủ công và không gian sôi động.",
        "services": [
            "Ăn tại chỗ",
            "Mang về",
            "Ngồi ngoài trời"
        ],
        "name": "The Anchor Restaurant & Bierhaus Trần Phú",
        "address": "214 Trần Phú, Hải Châu, Đà Nẵng, Việt Nam",
        "location": {
            "longitude": "108.225185",
            "latitude": "16.066494"
        },
        "reviews": [
            "Lựa chọn bia tuyệt vời!",
            "Đồ ăn ngon và dịch vụ xuất sắc.",
            "Không gian sôi động, hoàn hảo cho một buổi tối đi chơi."
        ],
        "images": [
            "the_anchor_restaurant1.jpg",
            "the_anchor_restaurant2.jpg",
            "the_anchor_restaurant3.jpg"
        ],
        "email": "info@theanchorbierhausdanang.com",
        "priceRange": "500.000 VND-3.000.000 VND",
        "type": "Nhà Hàng",
        "phone": "+84 236 3822 888",
        "openingHours": [
            {
                "day": "thứ hai",
                "time": {
                    "start": "11:00 SA",
                    "end": "11:00 CH"
                }
            },
            {
                "day": "thứ ba",
                "time": {
                    "start": "11:00 SA",
                    "end": "11:00 CH"
                }
            },
            {
                "time": {
                    "end": "11:00 CH",
                    "start": "11:00 SA"
                },
                "day": "thứ tư"
            },
            {
                "day": "thứ năm",
                "time": {
                    "start": "11:00 SA",
                    "end": "11:00 CH"
                }
            },
            {
                "day": "thứ sáu",
                "time": {
                    "start": "11:00 SA",
                    "end": "12:00 CH"
                }
            },
            {
                "time": {
                    "start": "11:00 SA",
                    "end": "12:00 CH"
                },
                "day": "thứ bảy"
            },
            {
                "day": "chủ nhật",
                "time": {
                    "end": "10:00 CH",
                    "start": "11:00 SA"
                }
            }
        ],
        "affiliate_link": "www.theanchorbierhausdanang.com",
        "id": "jOcjBEPB6F23IAmnfJ1n"
    }
],
  destination: {
    data: {
      priceRange: 'Miễn phí - 100,000 VND',
      localCultureAndCustoms: {
        traditionalFestivals: ['Lễ hội Lồng Đèn'],
        specialties: ['Cầu khóa tình yêu đẹp', 'Cảnh quan sống động nhìn ra sông Hàn'],
        etiquette: ['Không làm ồn', 'Giữ vệ sinh']
      },
      location: {
        longitude: '108.2245',
        latitude: '16.0687'
      },
      name: 'Cầu Tình Yêu',
      contactInfo: {
        touristOffice: 'Văn phòng Du lịch Cầu Tình Yêu',
        email: 'info@cautinhyeu.vn'
      },
      cuisine: ['Đặc sản miền Trung', 'Hải sản'],
      safetyAndSecurity: {
        advice: ['Tránh đám đông vào giờ cao điểm', 'Giữ vệ sinh chung'],
        measures: ['Camera giám sát', 'Bảo vệ'],
        status: 'An toàn'
      },
      transportation: {
        modes: ['Bus', 'Taxi', 'Xe máy'],
        convenience: 'Dễ dàng'
      },
      idealWeather: {
        condition: 'Nắng đẹp',
        averageTemperature: '25-30°C',
        humidity: '60-70%',
        wind: 'Nhẹ'
      },
      recreationalActivities: ['Chụp ảnh', 'Dạo bộ'],
      popularTimes: ['Buổi tối', '18:00-21:00'],
      accommodations: ['Khách sạn Hòa Bình Green', 'Khách sạn Brilliant'],
      attractions: ['Cầu khóa tình yêu', 'Khung cảnh sông Hàn']
    },
    message: 'Get Detail Destinations Success'
  }
};
