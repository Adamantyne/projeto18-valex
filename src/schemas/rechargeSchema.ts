import Joi from "joi";

export const postRechargeSchema = Joi.object({
    cardId: Joi.number().required(),
    amount: Joi.number().min(1).required()
});