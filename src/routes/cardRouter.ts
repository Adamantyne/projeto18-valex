import { Router } from "express";

import { postCard, activeCard,blockCard,unlockCard } from "../controllers/cardController.js";
import { postCardSchema, activeCardSchema,blockCardSchema } from "../schemas/cardSchema.js";
import {
  postCardMiddleware,
  activeCardMiddleware,
  blobkCardMiddleware,
  unlockCardMiddleware
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
cardRouter.post(
  "/block-card",
  validateSchema(blockCardSchema),
  blobkCardMiddleware,
  blockCard
);

cardRouter.post(
  "/unlock-card",
  validateSchema(blockCardSchema),
  unlockCardMiddleware,
  unlockCard
);

export default cardRouter;
