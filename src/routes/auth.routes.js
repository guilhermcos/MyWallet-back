import { Router } from "express";
import AuthControllers from "../controllers/auth.controllers.js";
import AuthValidations from "../middlewares/auth.validations.js";
import authSchemas from "../schemas/auth.schemas.js";
import schemaValidate from "../middlewares/schema.validations.js";

const authvalidations = new AuthValidations();
const authControllers = new AuthControllers();
const authRouter = Router();

authRouter.post(
  "/auth/signup",
  schemaValidate(authSchemas.schemaSignUp),
  authvalidations.validateSignUp,
  authControllers.signUp
);
authRouter.post(
  "/auth/signin",
  schemaValidate(authSchemas.schemaSignIn),
  authvalidations.validateSignIn,
  authControllers.signIn
);

export default authRouter;
