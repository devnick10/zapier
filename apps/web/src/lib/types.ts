export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Zap {
  id: string;
  triggerId: string;
  userId: string;
  action: Action[];
  trigger: Trigger;
  createdAt: string;
}

interface Action {
  id: string;
  zapId: string;
  availableActionId: string;
  sortingOrder: number;
  type: ActionType;
}

export interface ActionType {
  id: string;
  name: string;
  image: string;
}

interface Trigger {
  id: string;
  zapId: string;
  availableTriggerId: string;
  type: TriggerType;
}

export interface TriggerType {
  id: string;
  name: string;
  image: string;
}

export type CreateZapPayload = {
  triggerId: string;
  triggerMetadata: Record<string, any>;
  actions: {
    availableActionId: string;
    actionMetadata: Record<string, any>;
  }[];
};
