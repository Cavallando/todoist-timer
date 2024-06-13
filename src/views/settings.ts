import {
  DoistCard,
  DoistCardBridge,
  DoistCardRequest,
  SubmitAction,
  TextBlock,
  ToggleInput,
} from "@doist/ui-extensions-core";
import { prisma } from "../app";
import { Request } from "express";
import { Bridge } from "../helpers";

export const SettingsInitialView = async (
  request: Request
): Promise<DoistCard> => {
  const body = request.body as DoistCardRequest;
  const card = new DoistCard();

  const selectAction = SubmitAction.from({ id: "Action.ChangeSetting" });
  const user = await prisma.user.upsert({
    where: { todoist_id: `${body.context.user.id}` },
    update: {},
    create: {
      email: `${body.context.user.email}`,
      todoist_id: `${body.context.user.id}`,
    },
  });

  card.addItem(
    TextBlock.from({
      text: "Settings",
      size: "large",
      weight: "bolder",
    })
  );

  card.addItem(
    ToggleInput.from({
      id: "auto_close_task_enabled",
      title: "Automatically close task when stopping timer",
      defaultValue: user.auto_close_task_enabled ? "true" : "false",
      selectAction,
    })
  );

  card.addItem(
    ToggleInput.from({
      id: "timer_comments_enabled",
      title: "Track timer updates with comments",
      defaultValue: user.timer_comments_enabled ? "true" : "false",
      selectAction,
    })
  );

  return card;
};

export const SettingsSubmitView = async (
  request: Request
): Promise<DoistCardBridge[]> => {
  const body = request.body as DoistCardRequest;
  const field = body.action.inputs as {
    timer_comments_enabled: string;
    auto_close_task_enabled: string;
  };
  const timer_comments_enabled = field.timer_comments_enabled === "true";
  const auto_close_task_enabled = field.auto_close_task_enabled === "true";
  await prisma.user.upsert({
    where: { todoist_id: `${body.context.user.id}` },
    update: { timer_comments_enabled, auto_close_task_enabled },
    create: {
      email: `${body.context.user.email}`,
      todoist_id: `${body.context.user.id}`,
      timer_comments_enabled,
      auto_close_task_enabled,
    },
  });

  return [Bridge.notification("success", "Settings Updated")];
};
