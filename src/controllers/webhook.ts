import { Request } from "express";
import { TodoistApi } from "@doist/todoist-api-typescript";

export const WebhookController = async function (request: Request) {
  console.log("Webhook received", request.body);
  const { event_data } = request.body;
  const task_id = event_data?.id;
  const token = request.headers["x-todoist-apptoken"];
  const api = new TodoistApi(token as string);
  const comments = await api.getComments({ taskId: task_id });
  const startTimerComment = comments.find(
    (comment) => comment.content === "Start Timer"
  );
  const stopTimerComment = comments.find(
    (comment) => comment.content === "Stop Timer"
  );

  if (startTimerComment && !stopTimerComment) {
    console.log("Timer started for task", task_id);
    const startDate = new Date(startTimerComment.postedAt);
    api.addComment({
      taskId: task_id,
      content: "Stop Timer",
    });

    const endDate = new Date();
    const timeSpent = endDate.getTime() - startDate.getTime();
    const durationStr = new Date(timeSpent).toISOString().substr(11, 8);
    api.addComment({
      taskId: task_id,
      content: `Task Completed in ${durationStr} `,
    });
  }
};
