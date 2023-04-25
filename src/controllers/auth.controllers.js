import { getDataBase } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export default class AuthControllers {
  async signUp(req, res) {
    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    try {
      const db = getDataBase();
      await db.collection("users").insertOne({
        name,
        email,
        password: encryptedPassword,
      });
      res.status(201).send("OK");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async signIn(req, res) {
    const { email } = req.body;
    const token = uuid();
    const db = getDataBase();
    try {
      const user = await db.collection("users").findOne({ email: email });
      await db.collection("sessions").insertOne({
        userId: user._id,
        token,
      });
      const userFirstName = user.name.split(" ")[0];
      res.status(200).send({ name: userFirstName, token: token });
    } catch (err) {
      res.status(500).send("Internal server error");
    }
  }
}
