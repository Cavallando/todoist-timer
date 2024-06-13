import { DoistCardRequest } from "@doist/ui-extensions-core";
import { Request, Response } from "express";

import { Bridge } from "helpers";
import { StartTimerView, StopTimerView } from "views";

export const StartTimerController = async function (
  request: Request,
  response: Response
): Promise<void | Response> {
  const doistRequest: DoistCardRequest = request.body as DoistCardRequest;
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
  const { action } = doistRequest;

  if (action.actionType === "initial") {
    const bridges = await StopTimerView(action, request);

    return response.status(200).json({ bridges });
  }

  return response.status(200).json({
    bridges: [Bridge.notification("error", "Invalid action")],
  });
};
