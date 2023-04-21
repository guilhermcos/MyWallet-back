import { Router } from "express";
import AuthControllers from "../controllers/auth.controllers.js";
import AuthValidations from "../middlewares/auth.validations.js";
import joiSchemas from "../schemas/auth.schemas.js";
import schemaValidate from "../middlewares/schema.validations.js";

const authvalidations = new AuthValidations();
const authControllers = new AuthControllers();
const sessionRouter = Router();

sessionRouter.post(
  "/cadastro",
  schemaValidate(joiSchemas.schemaSignUp),
  authvalidations.validateSignUp,
  authControllers.signUp
);
sessionRouter.post("/", authControllers.signIn);

export default sessionRouter;