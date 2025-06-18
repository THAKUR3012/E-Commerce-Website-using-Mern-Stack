import express from "express"
import { addFeatureImage, getFeatureImages } from "../../controllers/common/feature.controller.js";

const FeatureRoute = express.Router();

FeatureRoute.post("/add", addFeatureImage);
FeatureRoute.get("/get", getFeatureImages);

export default FeatureRoute;