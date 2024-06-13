import { DoistCardRequest } from "@doist/ui-extensions-core";
import { Request, Response } from "express";

import { Bridge } from "../helpers";
import { InitialView } from "../views/initial";
import { StartTimerView } from "../views/start-timer";
import { StopTimerView } from "../views/stop-timer";

export const ProcessController = async function (
  request: Request,
  response: Response
): Promise<void | Response> {
  const doistRequest: DoistCardRequest = request.body as DoistCardRequest;
  console.log("ProcessController received", doistRequest);
  const { action } = doistRequest;

  if (action.actionType === "initial") {
    const card = await InitialView(action);

    return response.status(200).json({ card });
  } else if (action.actionType === "submit") {
    if (action.actionId === "Action.StartTimer") {
      const bridges = await StartTimerView(action, request);

      return response.status(200).json({ bridges });
    } else if (action.actionId === "Action.StopTimer") {
      const bridges = await StopTimerView(action, request);

      return response.status(200).json({ bridges });
    }
  }

  return response.status(200).json({
    bridges: [Bridge.notification("error", "Invalid action")],
  });
};

export const StartTimerController = async function (
  request: Request,
  response: Response
): Promise<void | Response> {
  const doistRequest: DoistCardRequest = request.body as DoistCardRequest;
  console.log("StartTimerController received", doistRequest);
  const { action } = doistRequest;

  if (action.actionType === "initial") {
    const bridges = await StartTimerView(action, request);

    return response.status(200).json({ bridges });
  }

  return response.status(200).json({
    bridges: [Bridge.notification("error", "Invalid action")],
  });
};

export const StopTimerController = async function (
  request: Request,
  response: Response
): Promise<void | Response> {
  const doistRequest: DoistCardRequest = request.body as DoistCardRequest;
  console.log("StopTimerController received", doistRequest);
  const { action } = doistRequest;

  if (action.actionType === "initial") {
    const bridges = await StopTimerView(action, request);

    return response.status(200).json({ bridges });
  }

  return response.status(200).json({
    bridges: [Bridge.notification("error", "Invalid action")],
  });
};
