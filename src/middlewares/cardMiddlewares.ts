import dayjs from "dayjs";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import { findById, TransactionTypes } from "../repositories/cardRepository.js";
import cardServices from "../services/cardServices.js";
import employeeServices from "../services/employeeServices.js";
import { encryptValue } from "../utils/cardUtuils.js";

export async function postCardMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let apiKey: string = req.headers["x-api-key"] as string;
  apiKey = apiKey?.replace("Bearer", "").trim();

  const { employeeId, type }: { employeeId: number; type: TransactionTypes } =
    req.body;

  const employeeInfos = await employeeServices.validateEmployee(
    apiKey,
    employeeId
  );
  await cardServices.validateCardType(type, employeeId);

  res.locals.userData = employeeInfos;
  next();
}

export async function activeCardMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, CVV, password }: { id: number; CVV: string; password: string } =
    req.body;

  const cardData = await cardServices.validateCardId(id);
  await cardServices.activeCardValidate(cardData,CVV);
  
  const saltRounds = 5;
  const encryptPassword = bcrypt.hashSync(password,saltRounds);
  res.locals.updateData = {id,encryptPassword}
  next();
}
