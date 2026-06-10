"use client";
import { api } from "@/lib/axios";
import { UpdateZapPayload, Zap } from "@/lib/types";
import { useState } from "react";

export const useUpdateZap = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const updateZap = async (data: UpdateZapPayload) => {
    console.log(data);
    try {
      setLoading(true);
      const result = await api.put(`/zap/${data.id}`, data);
      if (result.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateZap, success };
};
