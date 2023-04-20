import { Router } from "express";
import UserControllers from "../controllers/userControllers.js";
import Validations from "../middlewares/validations.js";

const validations = new Validations();
const userControllers = new UserControllers();
const sessionRouter = Router();

sessionRouter.post("/cadastro", validations.validateRegister, userControllers.registerUser);
sessionRouter.post("/", userControllers.login);

export default sessionRouter;
