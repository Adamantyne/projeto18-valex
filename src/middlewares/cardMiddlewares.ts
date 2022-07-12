import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import { TransactionTypes } from "../repositories/cardRepository.js";
import cardServices from "../services/cardServices.js";
import employeeServices from "../services/employeeServices.js";
import { validateQueryParams } from "../utils/cardUtuils.js";
import cardValidations from "../services/cardValidations.js";

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
  await cardValidations.validateCardType(type, employeeId);

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

  const cardData = await cardValidations.validateCardId(id);
  cardValidations.validateCardExpiration(cardData);
  cardServices.activeCardValidate(cardData, CVV);

  const saltRounds = 5;
  const encryptPassword = bcrypt.hashSync(password, saltRounds);
  res.locals.updateData = { id, encryptPassword };
  next();
}


export async function blobkCardMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, password }: { id: number; password: string } = req.body;

  const block = true;
  await cardServices.blockService(id, password, block);

  res.locals.cardId = { id };
  next();
}


export async function unlockCardMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, password }: { id: number; password: string } = req.body;

  const block = false;
  await cardServices.blockService(id, password, block);

  res.locals.cardId = { id };
  next();
}


export async function balanceMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const queryData = req.query;

  const [idString, password] = validateQueryParams([queryData.id, queryData.password],["id","password"]);
  const id = parseInt(idString);

  const cardData = await cardValidations.validateCardId(id);
  cardServices.authCardValidate(cardData, password);

  res.locals.cardId = { id };
  next();
}
