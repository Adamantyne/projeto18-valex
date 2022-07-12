import Joi from "joi";

import { cardDatadMask,cardTypes } from "../utils/cardUtuils.js";

export const postCardSchema = Joi.object({
  employeeId: Joi.number().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().pattern(cardTypes).required()
});

export const activeCardSchema = Joi.object({
  id: Joi.number().required(),
  CVV: Joi.string().length(3).pattern(cardDatadMask).required(),
  password: Joi.string().length(4).pattern(cardDatadMask).required()
});

export const blockCardSchema = Joi.object({
  id: Joi.number().required(),
  password: Joi.string().length(4).pattern(cardDatadMask).required()
});