import { getCarRecommendations } from "../services/geminiService.js";
import parseJSON from "../utils/parseJSON.js";

const buildPrompt = ({ budget, usage, familyMembers, currency, country }) =>
  `Country: ${country}
Budget: ${budget} ${currency}
Primary usage: ${usage}
Family members (passengers needed): ${familyMembers}

Recommend up to 5 cars that best match these inputs.`;

export const recommendedCars = async (req, res) => {
    const {
        budget,
        usage,
        familyMembers,
        currency = "INR",
        country = "India",
    } = req.body;

    const numericBudget = Number(budget);
    const numericFamily = Number(familyMembers);

    if (
        !Number.isFinite(numericBudget) || numericBudget <= 0 ||
        typeof usage !== "string" || !usage.trim() ||
        !Number.isInteger(numericFamily) || numericFamily <= 0 || numericFamily > 20
    ) {
        return res.status(400).json({
            error:
                "budget (positive number), usage (non-empty string), and familyMembers (positive integer up to 20) are required",
        });
    }

    try {
        const prompt = buildPrompt({
            budget: numericBudget,
            usage: usage.trim(),
            familyMembers: numericFamily,
            currency,
            country,
        });
        const text = await getCarRecommendations(prompt);
        const data = parseJSON(text);
        res.json(data);
    } catch (error) {
        console.error("recommendedCars failed:", error);
        res.status(500).json({ error: "Failed to generate recommendations" });
    }
};
