import { getDataBase } from "../database/database.js";
import bcrypt from "bcrypt";

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

  async validateSignIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const db = getDataBase();
      const user = await db.collection("users").findOne({ email: email });
      if (!user) return res.status(404).send("user not found");
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("UNAUTHORIZED");
      }
      next();
    } catch (err) {
      res.status(500).send("Internal server error");
    }
  }
}
