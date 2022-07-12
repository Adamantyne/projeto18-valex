import { NextFunction, Request, Response } from "express";

import employeeServices from "../services/employeeServices.js";
import cardValidations from "../services/cardValidations.js";
import { RechargeInsertData } from "../repositories/rechargeRepository.js";

export async function postRechargeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let apiKey: string = req.headers["x-api-key"] as string;
  apiKey = apiKey?.replace("Bearer", "").trim();
  const body: RechargeInsertData = req.body;

  const cardData = await cardValidations.validateCardId(body.cardId);
  const { employeeId } = cardData;
  cardValidations.validateCardExpiration(cardData);
  cardValidations.validateCardActive(cardData);

  await employeeServices.validateEmployee(apiKey, employeeId);

  res.locals.rechargeData = body;
  next();
}
