import Joi from "joi";

const authSchemas = {
  schemaSignUp: Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  }).unknown(true),

  schemaSignIn: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  }).unknown(true),
};

export default authSchemas;
