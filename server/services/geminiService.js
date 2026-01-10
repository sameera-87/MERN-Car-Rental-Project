import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeMessage = async (message, context = {}) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const systemPrompt = `
You are an AI assistant for a car rental platform in Sri Lanka.

Rules:
- Identify intent
- Extract entities
- Respond ONLY in valid JSON
- Do NOT hallucinate
- Use UNKNOWN if unsure

Allowed intents:
GREETING, FIND_CAR, MY_BOOKINGS, CANCEL_BOOKING, FAQ, UNKNOWN

Example response:
{
  "intent": "FIND_CAR",
  "entities": {
    "city": "Colombo",
    "pickupDate": "2026-01-10",
    "returnDate": "2026-01-11",
    "carType": "SUV"
  }
}
`;

  const prompt = `
${systemPrompt}

Conversation context:
${JSON.stringify(context)}

User message:
"${message}"
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
    console.log("Service layer recieved!");
  } catch (err) {
    return { intent: "UNKNOWN", entities: {} };
  }
};
