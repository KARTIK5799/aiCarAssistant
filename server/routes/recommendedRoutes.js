import express from "express";
import { recommendedCars } from "../controllers/recommendedController.js";

const routes = express.Router();

routes.post('/recommend', recommendedCars);

export default routes;
