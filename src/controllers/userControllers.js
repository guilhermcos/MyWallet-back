import { getDataBase } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export default class UserControllers {
  async registerUser(req, res) {
    const { name, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      name: name,
      email: email,
      password: encryptedPassword,
    };
    const db = getDataBase();
    try {
      db.collection("users").insertOne(newUser);
      res.status(201).send("OK");
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
  async login(req, res) {
    const { email } = req.body;
    const token = uuid();
    const db = getDataBase();
    try {
      const user = await db.collection("users").findOne({ email: email });
      await db
        .collection("sessions")
        .insertOne({ userId: user._id, token: token });
      res.status(200).send({ token: token });
    } catch (err) {
      res.status(500).send("Internal server error");
    }
  }
}
