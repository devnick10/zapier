"use client";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";

type ZapNode = Node<
  {
    onClick?: () => void;
    addNode?: () => void;
    index: number;
    type: "trigger" | "action";
    label: string;
    name?: string;
    image?: string;
  },
  "trigger" | "action"
>;

export function ZapNode({ data }: NodeProps<ZapNode>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        onClick={data.onClick}
        className="text-center flex flex-col items-center justify-center"
      >
        <div className="bg-neutral-200 py-4 px-8 font-medium">
          <div
            className="text-xl flex gap-1 items-center"
            onClick={data.onClick}
          >
            {data.image && (
              <img
                src={data.image}
                alt={data.label}
                className="h-5 w-5 object-contain"
              />
            )}
            <span>{data.index ? data.index : 1}</span>. {data.label}
          </div>
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    </>
  );
}
