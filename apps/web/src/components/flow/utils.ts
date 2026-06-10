import { ZapNodeType } from "./zap-node";

type CreateAcionNodePayload = {
  id: string;
  availableActionId: string;
  type: {
    id: string;
    name: string;
    image: string;
  };
}[];

export const createActionNode = (data: CreateAcionNodePayload): ZapNodeType[] =>
  data.map(({ id, type, availableActionId }, i) => ({
    id,
    type: "action",
    position: {
      x: window.innerWidth / 2 - 100,
      y: 250 + i * 150,
    },
    data: {
      availableActionId,
      label: type.name,
      image: type.image,
      name: type.name,
      index: i + 2,
    },
  }));

export const createTriggerNode = (
  id: string,
  name: string,
  image: string,
  availableTriggerId: string,
): ZapNodeType => ({
  id,
  type: "trigger",
  position: {
    x: window.innerWidth / 2 - 100,
    y: 100,
  },
  data: {
    availableTriggerId,
    label: name,
    image: image,
    name: name,
    index: 1,
  },
});
