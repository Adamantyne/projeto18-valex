import { Router } from "express";

import { postCard } from "../controllers/cardController.js";
import { postCardSchema } from "../schemas/cardSchema.js";
import { postCardMiddleware } from "../middlewares/cardMiddlewares.js";
import validateSchema from "../middlewares/schemaValidator.js";

const cardRouter = Router();

cardRouter.post("/card", validateSchema(postCardSchema),postCardMiddleware, postCard);

export default cardRouter;
