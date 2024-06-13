import { TodoistApi } from "@doist/todoist-api-typescript";
import { DoistCardAction, DoistCardBridge } from "@doist/ui-extensions-core";
import humanizeDuration from "humanize-duration";
import { Request } from "express";
import { prisma } from "../app";
import { Bridge } from "../helpers";

export const StopTimerView = async (
  action: DoistCardAction,
  request: Request
): Promise<DoistCardBridge[]> => {
  const bridges: DoistCardBridge[] = [];
  const token = request.headers["x-todoist-apptoken"];

  try {
    if (!action.params?.sourceId) {
      throw new Error("Unable to find Task ID");
    }

    const existingTimer = await prisma.timer.findUnique({
      where: { task_id: action.params?.sourceId as string },
      rejectOnNotFound: false,
    });

    if (!existingTimer) {
      throw new Error("Timer has not been started yet");
    }

    const ended_at = new Date();
    const timer = await prisma.timer.update({
      where: {
        id: existingTimer.id,
      },
      data: { ended_at },
    });

    const duration = ended_at.getTime() - timer.started_at.getTime();
    bridges.push(
      Bridge.notification(
        "success",
        `Task was completed in ${humanizeDuration(duration, {
          round: true,
        })}`
      )
    );

    const api = new TodoistApi(token as string);
    await api.addComment({
      taskId: timer.task_id,
      content: `Task was completed in ${humanizeDuration(duration, {
        round: true,
      })}`,
    });
  } catch (error) {
    console.error(error);
    bridges.push(Bridge.notification("error", error.message));
  }

  return [...bridges, Bridge.finished()];
};
