import { DoistCardRequest } from "@doist/ui-extensions-core";
import { Request, Response } from "express";
import { SettingsInitialView, SettingsSubmitView } from "views";

export const SettingsController = async function (
  request: Request,
  response: Response
): Promise<void | Response> {
  const body = request.body as DoistCardRequest;

  if (body.action.actionType === "initial") {
    const card = await SettingsInitialView(request);

    return response.status(200).json({ card });
  } else if (body.action.actionType === "submit") {
    const bridges = await SettingsSubmitView(request);
    const card = await SettingsInitialView(request);

    return response.status(200).json({
      bridges,
      card,
    });
  }
};
