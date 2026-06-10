export type FlowNodeData = {
  label: string;
  image: string;
  name: string;
  index: number;
  availableId?: string;
  onClick?: () => void;
};

export type ActionPayload = {
  availableActionId: string;
  actionMetadata: Record<string, any>;
};
