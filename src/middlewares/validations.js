import Schemas from "./schemas.js";
const schemas = new Schemas();
import { getDataBase } from "../database/database.js";

export default class Validations {
  async validateRegister(req, res, next) {
    try {
      await schemas.schemaRegisterUser(req.body);
      const { name, email, password } = req.body;
      const db = getDataBase();
      const registeredUser = await db
        .collection("users")
        .findOne({ email: email });
      if (registeredUser) {
        return res.status(409).send("email already registered");
      }
      next();
    } catch (err) {
      if (err.isJoi) {
        return res.status(422).send(err.message);
      }
      return res.status(500).send("Internal server error");
    }
  }
}
