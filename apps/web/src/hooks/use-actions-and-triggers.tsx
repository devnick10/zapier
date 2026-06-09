"use client";
import { api } from "@/lib/axios";
import { ActionType, TriggerType } from "@/lib/types";
import { useEffect, useState } from "react";

export const useAvailableActionsAndTriggers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [availableActions, setAvailabelActions] = useState<ActionType[]>([]);
  const [availabelTriggers, setAvailabelTriggers] = useState<TriggerType[]>([]);

  useEffect(() => {
    async function getActionsAndTriggers() {
      try {
        setLoading(true);
        const actionsResponse = api.get("/action/available");
        const triggersResponse = api.get("/trigger/available");
        const [actions, triggers] = await Promise.allSettled([
          actionsResponse,
          triggersResponse,
        ]);
        if (actions.status === "fulfilled") {
          setAvailabelActions(actions.value.data.actions);
        }
        if (triggers.status === "fulfilled") {
          setAvailabelTriggers(triggers.value.data.triggers);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getActionsAndTriggers();
  }, []);

  return { availabelTriggers, availableActions, loading };
};
