import { Request, Response } from "express";

import { TransactionTypes, update } from "../repositories/cardRepository.js";
import cardServices from "../services/cardServices.js";

export async function postCard(req: Request, res: Response) {
  const { fullName, id: employeeId }: { fullName: string; id: number } =
    res.locals.userData;
    
  const { type: cardType }: { type: TransactionTypes } = req.body;
  const CVV = await cardServices.postCardService(fullName, employeeId, cardType);

  return res.status(201).send(`card created... Your CVV: ${CVV}`);
}


export async function activeCard(req: Request, res: Response) {
  const { id, encryptPassword }: { id: number; encryptPassword: string } =
    res.locals.updateData;
  
  await update(id, { password: encryptPassword, isBlocked: false });

  return res.status(201).send("card actived");
}


export async function blockCard(req: Request, res: Response) {
  const { id }: { id: number } = res.locals.cardId;
  
  await update(id, { isBlocked: true });

  return res.status(201).send("card blocked");
}


export async function unlockCard(req: Request, res: Response) {
  const { id }: { id: number } = res.locals.cardId;
  
  await update(id, { isBlocked: false });

  return res.status(201).send("card unlocked");
}


export async function balanceCard(req: Request, res: Response) {
  const { id }: { id: number } = res.locals.cardId;
  const balanceData = await cardServices.balanceService(id);
  return res.status(200).send(balanceData);
}