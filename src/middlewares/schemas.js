import Joi from "joi";

export default class Schemas {
  async schemaRegisterUser(body) {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
    }).unknown(true);
    try {
      await schema.validateAsync(body);
    } catch (err) {
      throw err;
    }
  }
}
