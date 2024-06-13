import {
  DoistCardBridge,
  DoistCardBridgeNotification,
  SubmitAction,
  Action,
  ActionStyle,
  TextBlock,
} from "@doist/ui-extensions-core";

const notification = (
  type: DoistCardBridgeNotification["type"],
  text: string
): DoistCardBridge => {
  return {
    bridgeActionType: "display.notification",
    notification: {
      type,
      text,
    },
  };
};

const finished = (): DoistCardBridge => {
  return {
    bridgeActionType: "finished",
  };
};

const submit = (
  id: string,
  title: string,
  style: ActionStyle = "positive"
): Action => {
  return SubmitAction.from({
    id,

    title,
    style,
  });
};

const text = (text: string): TextBlock => {
  return TextBlock.from({
    text,
  });
};

export const Bridge = {
  notification,
  finished,
};

export const Card = {
  submit,
  text,
};
