import Joi from "joi";

import { cardDatadMask } from "../utils/cardUtuils.js";

export const postPaymentSchema = Joi.object({
  cardId: Joi.number().required(),
  businessId: Joi.number().required(),
  amount: Joi.number().min(1).required(),
  password: Joi.string().length(4).pattern(cardDatadMask).required()
});
