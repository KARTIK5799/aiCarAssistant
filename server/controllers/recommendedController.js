import { getCarRecommendations } from "../services/geminiService.js";
import parseJSON from "../utils/parseJSON.js";

const buildPrompt = ({
  budgetMin,
  budgetMax,
  usage,
  familyMembers,
  currency,
  country,
}) =>
  `Country: ${country}
Budget range: ${budgetMin} - ${budgetMax} ${currency}
Primary usage: ${usage}
Family members (passengers needed): ${familyMembers}

Recommend up to 3 cars that best match these inputs.`;

export const recommendedCars = async (req, res) => {
    const {
        budgetMin = 0,
        budgetMax,
        usage,
        familyMembers,
        currency = "INR",
        country = "India",
    } = req.body;

    const numericBudgetMin = Number(budgetMin);
    const numericBudgetMax = Number(budgetMax);
    const numericFamily = Number(familyMembers);

    if (
        !Number.isFinite(numericBudgetMax) || numericBudgetMax <= 0 ||
        !Number.isFinite(numericBudgetMin) || numericBudgetMin < 0 ||
        numericBudgetMin >= numericBudgetMax ||
        typeof usage !== "string" || !usage.trim() ||
        !Number.isInteger(numericFamily) || numericFamily <= 0 || numericFamily > 20
    ) {
        return res.status(400).json({
            error:
                "budgetMax (positive number > budgetMin), usage (non-empty string), and familyMembers (positive integer up to 20) are required",
        });
    }

    try {
        const prompt = buildPrompt({
            budgetMin: numericBudgetMin,
            budgetMax: numericBudgetMax,
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
