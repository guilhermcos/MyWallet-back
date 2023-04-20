import express from "express";
import cors from "cors";
import sessionRouter from "../routers/sessionRoutes.js";

export function connectServer(serverConfig) {
  const { PORT } = serverConfig;
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(sessionRouter);
  app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
  });
  return app;
}
