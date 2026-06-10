"use client";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

interface ZapById {
  id: string;
  triggerId: string;
  userId: string;
  createdAt: string;
  action: [
    {
      id: string;
      zapId: string;
      availableActionId: string;
      sortingOrder: number;
      type: {
        id: string;
        name: string;
        image: string;
      };
    },
  ];
  trigger: {
    id: string;
    zapId: string;
    availableTriggerId: string;
    type: {
      id: string;
      name: string;
      image: string;
    };
  };
}

export const useZapById = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [zap, setZap] = useState<ZapById | null>(null);

  useEffect(() => {
    async function getZap() {
      try {
        setLoading(true);
        const res = await api.get(`/zap/${id}`);
        setZap(res.data.zap);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getZap();
  }, []);

  return { zap, loading };
};
