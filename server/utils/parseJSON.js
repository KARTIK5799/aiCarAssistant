export default function parseJSON(text, fallback = { cars: [] }) {
  if (typeof text !== "string") return fallback;
  try {
    const cleaned = text.replace(/```(?:json)?/gi, "").trim();
    const match = cleaned.match(/[\[{][\s\S]*[\]}]/);
    return JSON.parse(match ? match[0] : cleaned);
  } catch (err) {
    console.error("parseJSON failed:", err.message, "| text was:", text?.slice(0, 500));
    return fallback;
  }
}
