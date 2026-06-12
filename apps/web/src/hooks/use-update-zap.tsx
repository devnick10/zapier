"use client";
import { api } from "@/lib/axios";
import { UpdateZapPayload } from "@/lib/types";
import { useState } from "react";

export const useUpdateZap = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const updateZap = async (data: UpdateZapPayload) => {
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
