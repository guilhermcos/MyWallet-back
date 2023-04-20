import { Router } from "express";
import UserControllers from "../controllers/userControllers.js";

const userControllers = new UserControllers();
const sessionRouter = Router();

sessionRouter.post("/cadastro", userControllers.registerUser);
sessionRouter.post("/", userControllers.login);

export default sessionRouter;
