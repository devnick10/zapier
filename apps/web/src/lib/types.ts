export interface User {
    name: string
    email: string
    password: string
}

export interface Zap {
    id: string;
    triggerId: string;
    userId: string;
    action: Action[];
    trigger: Trigger;
    createdAt: string
}

export interface Action {
    id: string;
    zapId: string;
    availableActionId: string;
    sortingOrder: number;
    type: ActionType;
}

interface ActionType {
    id: string;
    name: string;
}

export interface Trigger {
    id: string;
    zapId: string;
    availableTriggerId: string;
    type: TriggerType;
}

interface TriggerType {
    id: string;
    name: string;
}