import { Router } from "express";

import { postPayment } from "../controllers/paymentController.js";
import { postPaymentMiddleware } from "../middlewares/paymentMiddleware.js";
import validateSchema from "../middlewares/schemaValidator.js";
import { postPaymentSchema } from "../schemas/paymentSchema.js";

const paymentRouter = Router();

paymentRouter.post("/payment",validateSchema(postPaymentSchema),postPaymentMiddleware,postPayment);

export default paymentRouter;