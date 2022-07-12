import { Router } from "express";

import {
  postCard,
  activeCard,
  blockCard,
  unlockCard,
  balanceCard,
  employeeCards
} from "../controllers/cardController.js";
import {
  postCardSchema,
  activeCardSchema,
  blockCardSchema,
} from "../schemas/cardSchema.js";
import {
  postCardMiddleware,
  activeCardMiddleware,
  blockCardMiddleware,
  unlockCardMiddleware,
  balanceMiddleware,
  employeeCardsMiddleware
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
  blockCardMiddleware,
  blockCard
);

cardRouter.post(
  "/unlock-card",
  validateSchema(blockCardSchema),
  unlockCardMiddleware,
  unlockCard
);

cardRouter.get("/balance-card", balanceMiddleware, balanceCard);

cardRouter.get("/employee-cards/:employeeId", employeeCardsMiddleware, employeeCards);

export default cardRouter;
