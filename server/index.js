import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import routes from "./routes/recommendedRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
});

app.get("/ping", (req, res) => {
  res.status(200).json({
    status: "alive",
    time: new Date()
  });
});

app.use('/api', apiLimiter, routes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
