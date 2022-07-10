import { Request, Response } from "express";

import { TransactionTypes } from "../repositories/cardRepository.js";
import cardServices from "../services/cardServices.js";

export async function postCard(req: Request, res: Response) {
  const { fullName, id: employeeId }: { fullName: string; id: number } =
    res.locals.userData;
  const { type: cardType }: { type: TransactionTypes } = req.body;
  await cardServices.postCardService(fullName, employeeId, cardType);

  return res.status(201).send("card was created");
}
