import Joi from "joi";

const tokenSchema = {
  schemaToken: Joi.object({
    authorization: Joi.string().required().min(1),
  }).unknown(true),
};

export default tokenSchema;
