import { Router } from "express";

import { postRecharge } from "../controllers/rechargeController.js";
import { postRechargeMiddleware } from "../middlewares/rechargeMiddleware.js";
import validateSchema from "../middlewares/schemaValidator.js";
import { postRechargeSchema } from "../schemas/rechargeSchema.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge",validateSchema(postRechargeSchema),postRechargeMiddleware,postRecharge);

export default rechargeRouter;
