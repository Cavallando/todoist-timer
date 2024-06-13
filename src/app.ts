import express from "express";
import { PrismaClient } from "@prisma/client";
import {
  SettingsController,
  StartTimerController,
  StopTimerController,
} from "./controllers";

export const prisma = new PrismaClient();
export const app = express();

const router = express.Router();
const timerRouter = express.Router();

app.use(express.json());

router.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

timerRouter.post("/start", StartTimerController);
timerRouter.post("/stop", StopTimerController);
timerRouter.post("/settings", SettingsController);

app.use("/", router);
app.use("/timers", timerRouter);
