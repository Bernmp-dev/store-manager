const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required()
  .messages({
    'any.required': '{{#label}} is required',
    'number.base': '"value" must be a number',
    'number.min': '"value" must be greater than or equal to {{#limit}}',
});

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required()
    .label('name'),
}).required().messages({
  'any.required': '"{{#key}}" is required',
  'string.base': '{{#key}} must be a string',
  'string.min': '"{{#key}}" length must be at least {{#limit}} characters long',
});

const salesItemSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
}).required().messages({
  'any.required': '"{{#key}}" is required',
  'number.min': '"{{#key}}" must be greater than or equal to {{#limit}}',
});

const salesSchema = Joi.array().items(salesItemSchema);

module.exports = {
  idSchema,
  addProductSchema,
  salesSchema,
};