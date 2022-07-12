import { Request, Response } from "express";

import {PostPaymentData} from "../middlewares/paymentMiddleware.js";
import { insert } from "../repositories/paymentRepository.js";

export async function postPayment(req: Request, res: Response) {
  const paymentData: PostPaymentData = res.locals.paymentData;

  delete paymentData.password;

  await insert(paymentData);

  res.status(201).send("payment completed");
}
