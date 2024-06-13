import { DoistCard, DoistCardAction } from "@doist/ui-extensions-core";
import { prisma } from "app";
import humanizeDuration from "humanize-duration";
import { Card } from "helpers";

export const InitialView = async function (
  action: DoistCardAction
): Promise<DoistCard> {
  const card = new DoistCard();
  const existingTimer = await prisma.timer.findUnique({
    where: { task_id: `${action.params?.sourceId}` as string },
    rejectOnNotFound: false,
  });

  if (existingTimer) {
    const now = new Date().getTime();
    const startedAt = existingTimer.started_at.getTime();
    const diff = now - startedAt;

    card.addItem(
      Card.text(
        `Timer has been running for ${humanizeDuration(diff, { round: true })}`
      )
    );
    card.addAction(Card.submit("Action.StopTimer", "Stop Timer"));
  } else {
    card.addAction(Card.submit("Action.StartTimer", "Start Timer"));
  }

  return card;
};
