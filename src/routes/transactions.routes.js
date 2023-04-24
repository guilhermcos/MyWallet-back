import { Router } from "express";
import TransactionsControllers from "../controllers/transactions.controllers.js";
import transactionsSchemas from "../schemas/transactions.schemas.js";
import schemaValidate from "../middlewares/schema.validations.js";
import validateToken from "../middlewares/token.validation.js";

const transactionsControllers = new TransactionsControllers();

const transactionRouter = Router();

transactionRouter.post(
  "/transactions/new-transaction",
  validateToken,
  schemaValidate(transactionsSchemas.schemaNewTransaction),
  transactionsControllers.newTransaction
);

export default transactionRouter;
