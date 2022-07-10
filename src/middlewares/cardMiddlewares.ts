import { NextFunction, Request, Response } from "express";

import { TransactionTypes } from "../repositories/cardRepository.js";
import cardServices from "../services/cardServices.js";
import employeeServices from "../services/employeeServices.js";

export async function postCardMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let apiKey: string = req.headers["x-api-key"] as string;
  apiKey = apiKey?.replace("Bearer", "").trim();

  const { employeeId, type }: 
  { employeeId: number; type: TransactionTypes } = req.body;

  const employeeInfos = await employeeServices.validateEmployee(apiKey, employeeId);
  await cardServices.validateCardType(type, employeeId);

  res.locals.userData = employeeInfos;
  next();
}
