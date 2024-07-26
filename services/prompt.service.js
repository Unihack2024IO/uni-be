import { getForecastOnDay } from './Forecast.js';
// import VertexAI from '@google-cloud/vertexai';


export const getPrompt = async (user, destination, date, actitivities,forecast) => {
    try {
      forecast = JSON.stringify(forecast);
      const question = ` Hãy cho tôi biết tôi có nên tham dự ${actitivities.name} vào ngày ${date} hay không dựa trên thông tin cá nhân , thông tin về sự kiện, dự báo thời tiết . Hãy cung cấp lời khuyên về việc nên chuẩn bị gì, cần lưu ý điều gì và thời gian lý tưởng để đến tham dự sự kiện. Bên cạnh đó, hãy chia sẻ thêm một số mẹo bổ ích giúp tôi tận hưởng tối đa ${actitivities.name}`;
     
      const prompt = `
        {
            task : {
                language : "vi",
                format : "json",
                output_format : {
                    recommendation : true,
                    preparation : true,
                    caution : true,
                    ideal_time : true,
                    tips : true,
                },
                question : "${question}",
                time : "${date}",
                activity : "${JSON.stringify(actitivities)}"
            },
            information : {
                user : ${JSON.stringify(user)},
                destination : ${JSON.stringify(destination)},
                weather : ${forecast}
            },
            response_schema : {
                recommendation : {
                    shouldVisit : {
                        decision : "", //yes, no, maybe
                        reasons : {
                            pro : [],
                            con : []
                        },
                        advice : ""
                    }
                },
                preparation : {
                    items : [
                        {
                            item : "",
                            reason : ""
                        }
                    ],
                    advice : ""
                },
                caution : {
                    warnings : [
                        {
                            warning : "",
                            reason : ""
                        }
                    ],
                    advice : ""
                },
                ideal_time : {
                    time : ""
                },
                tips : {
                    general : [
                        {
                            tip : "",
                            reason : ""
                        }
                    ],
                    specific : [
                        {
                            tip : "",
                            reason : ""
                        }
                    ],
                    advice : ""
                }
            }

        }    
      
      `;
  
      return prompt;
    } catch (error) {
        throw new Error
    }
  };

