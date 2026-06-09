"use client";

import dynamic from "next/dynamic";

const FlowComponent = dynamic(() => import("@/components/flow/flow"), {
  ssr: false,
});

export default function ZapCreate() {
  return <FlowComponent />;
}
