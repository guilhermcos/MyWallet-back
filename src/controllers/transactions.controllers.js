import { getDataBase } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

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

  async getUserTransactions(req, res) {
    const db = getDataBase();
    const reqToken = req.headers.authorization?.replace("Bearer ", "");
    try {
      const session = await db
        .collection("sessions")
        .findOne({ token: reqToken });
      if (!session) return res.sendStatus(401);
      const transactions = await db
        .collection("transactions")
        .find({ userId: session.userId })
        .sort({ _id: -1 })
        .toArray();
      return res.status(200).send(transactions);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  async editTransaction(req, res) {
    const { id } = req.params;
    const transactionId = new ObjectId(id);
    const { description, value } = req.body;
    const db = getDataBase();
    try {
      const transaction = await db
        .collection("transactions")
        .findOne({ _id: transactionId });
        console.log(transaction)
      const editedTransaction = { ...transaction, description, value };
      await db
        .collection("transactions")
        .updateOne({ _id: transactionId }, { $set: editedTransaction });
      res.sendStatus(201);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
