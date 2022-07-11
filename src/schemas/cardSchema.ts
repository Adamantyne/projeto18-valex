import Joi from "joi";

const cardTypes = /^(groceries|restaurant|education|health|transport)$/
const cadrDatadMask = /^[0-9]+$/

export const postCardSchema = Joi.object({
  employeeId: Joi.number().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().pattern(cardTypes).required()
});

export const activeCardSchema = Joi.object({
  id: Joi.number().required(),
  CVV: Joi.string().length(3).pattern(cadrDatadMask).required(),
  password: Joi.string().length(4).pattern(cadrDatadMask).required(),
});