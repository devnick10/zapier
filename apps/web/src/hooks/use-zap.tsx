"use client";
import { api } from "@/lib/axios";
import { Zap } from "@/lib/types";
import { useEffect, useState } from "react";

export const useZap = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [zaps, setZaps] = useState<Zap[]>([]);
  useEffect(() => {
    async function getZaps() {
      try {
        setLoading(true);
        await api.get("/zap").then((res) => {
          setZaps(res.data.zaps);
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getZaps();
  }, []);

  return { zaps, loading };
};
