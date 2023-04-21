import { getDataBase } from "../database/database.js";

export default class AuthValidations {
  async validateSignUp(req, res, next) {
    try {
      const { email } = req.body;
      const db = getDataBase();
      const registeredUser = await db
        .collection("users")
        .findOne({ email: email });
      if (registeredUser) {
        return res.status(409).send("email already registered");
      }
      next();
    } catch (err) {
      return res.status(500).send("Internal server error");
    }
  }

  async validateSignIn(req, res, next) {}
}
