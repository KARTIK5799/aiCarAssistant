import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `You are an expert automotive advisor specialized in the Indian car market. You recommend cars based on the user's budget range, primary usage, and family size.

Guidelines:
- Recommend ONLY real, currently available cars in the user's specified country (default: India).
- Every recommendation MUST fit within the user's budget range (treat the budget as the on-road price ceiling).
- For India, prefer popular and reliable brands: Maruti Suzuki, Tata, Hyundai, Mahindra, Kia, Toyota, Honda, Skoda, Volkswagen, MG. Include EV options where relevant (Tata, MG, Hyundai).
- Match body type and seating to family size and usage:
  - 1-2 members + city commute: hatchback or compact sedan.
  - 3-4 members + mixed use: compact SUV or sedan.
  - 5+ members or family trips: 7-seater SUV or MPV.
  - Off-road / highway: SUV with strong drivetrain (AWD/4WD when relevant).
- Mix new and reliable used options if it gives the user better value within budget.
- Return up to 3 strong matches. It is better to return 1 great match than 3 mediocre ones. If the budget is unrealistic for the country, return an empty cars array.
- For each car provide:
  - priceRangeLow / priceRangeHigh: realistic on-road price range in user's currency.
  - description: 1-2 sentence pitch about why this car fits.
  - pros: exactly 3 short positive bullet points (max 6 words each).
  - cons: exactly 2 short negative bullet points (max 6 words each).`;

const carRecommendationSchema = {
  type: SchemaType.OBJECT,
  properties: {
    cars: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          make: { type: SchemaType.STRING },
          model: { type: SchemaType.STRING },
          priceRangeLow: { type: SchemaType.NUMBER },
          priceRangeHigh: { type: SchemaType.NUMBER },
          currency: { type: SchemaType.STRING },
          bodyType: { type: SchemaType.STRING },
          seatingCapacity: { type: SchemaType.INTEGER },
          fuelType: { type: SchemaType.STRING },
          transmission: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          pros: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
          cons: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
        },
        required: [
          "make",
          "model",
          "priceRangeLow",
          "priceRangeHigh",
          "currency",
          "fuelType",
          "description",
          "pros",
          "cons",
        ],
      },
    },
  },
  required: ["cars"],
};

let cachedModel;
const getModel = () => {
  if (cachedModel) return cachedModel;
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  cachedModel = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: carRecommendationSchema,
      temperature: 0.5,
      maxOutputTokens: 1536,
    },
  });
  return cachedModel;
};

const TIMEOUT_MS = 15_000;
const withTimeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`Gemini request timed out after ${ms}ms`)),
        ms,
      ),
    ),
  ]);

export const getCarRecommendations = async (prompt) => {
  const result = await withTimeout(
    getModel().generateContent(prompt),
    TIMEOUT_MS,
  );
  return result.response.text();
};
