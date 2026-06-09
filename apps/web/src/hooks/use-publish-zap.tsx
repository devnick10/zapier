"use client";
import { api } from "@/lib/axios";
import { CreateZapPayload } from "@/lib/types";
import { useState } from "react";

export const usePublishZap = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const publish = async (data: CreateZapPayload) => {
    console.log(data);
    try {
      setLoading(true);
      const result = await api.post("/zap", data);
      if (result.status === 201) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, publish, success };
};
