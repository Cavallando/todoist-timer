import { TodoistApi } from "@doist/todoist-api-typescript";
import { DoistCardAction, DoistCardBridge } from "@doist/ui-extensions-core";
import { Request } from "express";
import { prisma } from "app";
import { Bridge } from "helpers";

export const StartTimerView = async (
  action: DoistCardAction,
  request: Request
): Promise<DoistCardBridge[]> => {
  const bridges: DoistCardBridge[] = [];
  const token = request.headers["x-todoist-apptoken"];

  try {
    if (!action.params?.sourceId) {
      throw new Error("Error starting timer");
    }

    await prisma.timer.upsert({
      where: {
        task_id: `${action.params.sourceId}` as string,
      },
      update: {
        user: {
          connectOrCreate: {
            where: { todoist_id: request.body.context.user.id },
            create: {
              todoist_id: request.body.context.user.id,
              email: request.body.context.user.email,
            },
          },
        },
      },
      create: {
        task_id: `${action.params.sourceId}` as string,
        started_at: new Date(),
        user: {
          connectOrCreate: {
            where: { todoist_id: request.body.context.user.id },
            create: {
              todoist_id: request.body.context.user.id,
              email: request.body.context.user.email,
            },
          },
        },
      },
    });

    bridges.push(
      Bridge.notification(
        "success",
        action.params?.content
          ? `Started Timer for ${action.params?.content}`
          : "Started Timer for Task"
      )
    );

    const api = new TodoistApi(token as string);
    await api.addComment({
      taskId: action.params.sourceId as string,
      content: "Timer Started",
    });
  } catch (error) {
    console.error(error);
    bridges.push(Bridge.notification("error", error.message));
  }

  return [...bridges, Bridge.finished()];
};
