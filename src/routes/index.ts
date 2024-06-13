import { Router } from "express";
import {
  ProcessController,
  StartTimerController,
  StopTimerController,
} from "../controllers/process";

export const indexRouter = Router();

indexRouter.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

indexRouter.post("/process", ProcessController);

indexRouter.post("/timers/start", StartTimerController);

indexRouter.post("/timers/stop", StopTimerController);
