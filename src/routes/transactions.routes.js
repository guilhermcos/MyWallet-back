import { Router } from "express";
import TransactionsControllers from "../controllers/transactions.controllers.js";
import TransactionsValidations from "../middlewares/transactions.validations.js";
import transactionsSchemas from "../schemas/transactions.schemas.js";
import schemaValidate from "../middlewares/schema.validations.js";
import validateToken from "../middlewares/token.validation.js";

const transactionsControllers = new TransactionsControllers();
const transactionsValidations = new TransactionsValidations();

const transactionRouter = Router();

transactionRouter.post(
  "/transactions/new-transaction",
  validateToken,
  schemaValidate(transactionsSchemas.schemaNewTransaction),
  transactionsControllers.newTransaction
);
transactionRouter.get(
  "/transactions/get",
  validateToken,
  transactionsControllers.getUserTransactions
);
transactionRouter.put(
  "/transactions/edit-transaction/:id",
  validateToken,
  transactionsValidations.validateEditTransaction,
  transactionsControllers.editTransaction
);
transactionRouter.delete(
  "/transactions/delete-transaction/:id",
  validateToken,
  transactionsControllers.deleteTransaction
);

export default transactionRouter;
