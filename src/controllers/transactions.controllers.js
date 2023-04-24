import { getDataBase } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

export default class TransactionsControllers {
  async newTransaction(req, res) {
    const db = getDataBase();
    const reqToken = req.headers.authorization?.replace("Bearer ", "");
    try {
      const session = await db
        .collection("sessions")
        .findOne({ token: reqToken });
      if (!session) return res.sendStatus(401);
      const newTransaction = {
        ...req.body,
        value: Number(req.body.value.toFixed(2)),
        userId: session.userId,
        date: dayjs(Date.now()).format("DD-MM"),
      };
      await db.collection("transactions").insertOne(newTransaction);
      return res.status(201).send("OK");
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}
