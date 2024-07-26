import { GoogleGenerativeAI } from '@google/generative-ai';

let modelInstance = null;

function getModelInstance() {
    if (!modelInstance) {
        console.log("Creating new model instance");
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        modelInstance = genAI.getGenerativeModel({ model: "gemini-1.5-pro",
            generationConfig: {
                topP: 0.9,
                temperature: 2,

            }


        });

    }
    return modelInstance;
}

export async function getGeminiAns(prompt) {
    try {
        const model = getModelInstance();
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
}
