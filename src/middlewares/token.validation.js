import { getDataBase } from "../database/database.js";
import tokenSchema from "../schemas/token.schemas.js";

export default async function validateToken(req, res, next) {
  try {
    await tokenSchema.schemaToken.validateAsync(req.headers);
    const reqToken = req.headers.authorization?.replace("Bearer ", "");
    const db = getDataBase();
    const session = await db
      .collection("sessions")
      .findOne({ token: reqToken });
    if (!session) return res.sendStatus(401);
    const user = await db.collection("users").findOne({ _id: session?.userId });
    if (!user) {
      return res
        .status(404)
        .send("usuário referente a essa sessão não encontrado");
    }
    next();
  } catch (err) {
    if (err.isJoi) return res.status(422).send(err.message);
    return res.status(500).send(err.message);
  }
}
