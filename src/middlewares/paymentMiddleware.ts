import { NextFunction, Request, Response } from "express";

import cardValidations from "../services/cardValidations.js";
import cardServices from "../services/cardServices.js";
import businessService from "../services/businessServices.js";

export interface PostPaymentData {
  cardId: number;
  businessId: number;
  amount: number;
  password?: string;
}

export async function postPaymentMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body: PostPaymentData = req.body;
  const { cardId, password, amount,businessId } = body;

  const cardData = await cardValidations.validateCardId(cardId);
  cardValidations.validateCardExpiration(cardData);
  cardValidations.validateCardActive(cardData);
  cardValidations.validateCardUnlock(cardData.isBlocked);
  cardServices.authCardValidate(cardData, password);
  await businessService.validateBusiness(businessId,cardData.type);
  const { balance } = await cardServices.balanceService(cardId);
  if (amount > balance) {
    throw {
      type: "Unauthorized",
      message: "insufficient funds",
    };
  }
  

  res.locals.paymentData = body;
  next();
}
