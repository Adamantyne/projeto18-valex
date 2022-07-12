import { Request, Response } from "express";

import { insert,RechargeInsertData } from "../repositories/rechargeRepository.js";

export async function postRecharge(req: Request, res: Response) {
    const rechargeData: RechargeInsertData = res.locals.rechargeData;
    
    await insert(rechargeData);

    res.status(201).send("recharge completed")
}