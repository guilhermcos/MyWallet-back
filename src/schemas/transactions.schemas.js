import Joi from "joi";

const transactionsSchemas = {
  schemaNewTransaction: Joi.object({
    description: Joi.string().required(),
    value: Joi.number().positive().required(),
    type: Joi.string().valid("income", "expense").required(),
  }),
};

export default transactionsSchemas;
