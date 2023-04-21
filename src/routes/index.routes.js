import { Router } from "express";
import sessionRouter from "./auth.routes.js";

const router = Router();

router.use(sessionRouter);

export default router;
