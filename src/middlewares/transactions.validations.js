import { ObjectId } from "mongodb";
import { getDataBase } from "../database/database.js";

export default class TransactionsValidations {
  async validateEditTransaction(req, res, next) {
    const { id } = req.params;
    const transactionId = new ObjectId(id);
    const reqToken = req.headers.authorization?.replace("Bearer ", "");
    const db = getDataBase();
    try {
      const transaction = await db
        .collection("transactions")
        .findOne({ _id: transactionId });
      const session = await db
        .collection("sessions")
        .findOne({ token: reqToken });
      next();
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
