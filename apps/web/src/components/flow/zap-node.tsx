"use client"
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

type ZapNode = Node<{
    addNode?: () => void,
    index: number
    type: "trigger" | "action"
    label: string
}, 'number'>;

export function ZapNode({ data }: NodeProps<ZapNode>) {
    return (<>
        <Handle type="target" position={Position.Top} />
        <div onClick={data.addNode} className="text-center flex flex-col items-center justify-center">
            <div className="bg-neutral-200 py-4 px-8 font-medium">
                <div
                    className="text-xl"
                    onClick={(e) => {
                        toast.success("trigger")
                    }}> <span> {data.index ? data.index : 1}</span>. {data.label}</div>
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    </>
    );
}