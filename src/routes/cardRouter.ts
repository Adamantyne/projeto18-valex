import { Router } from "express";

import { postCard, activeCard } from "../controllers/cardController.js";
import { postCardSchema, activeCardSchema } from "../schemas/cardSchema.js";
import {
  postCardMiddleware,
  activeCardMiddleware,
} from "../middlewares/cardMiddlewares.js";
import validateSchema from "../middlewares/schemaValidator.js";

const cardRouter = Router();

cardRouter.post(
  "/card",
  validateSchema(postCardSchema),
  postCardMiddleware,
  postCard
);
cardRouter.post(
  "/activate-card",
  validateSchema(activeCardSchema),
  activeCardMiddleware,
  activeCard
);

export default cardRouter;
