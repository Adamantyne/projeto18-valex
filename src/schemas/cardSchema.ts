import Joi from "joi";

const cardTypes = /^(groceries|restaurant|education|health|transport)$/

export const postCardSchema = Joi.object({
  employeeId: Joi.number().required(),
  isVirtual: Joi.boolean().required(),
  type: Joi.string().pattern(cardTypes).required()
});
