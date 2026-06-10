"use client";

import {
  Background,
  Connection,
  Controls,
  Edge,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { ZapNode, ZapNodeType } from "./zap-node";

const nodeTypes = {
  trigger: ZapNode,
  action: ZapNode,
};

interface ZapCanvasProps {
  nodes: ZapNodeType[];
  edges: Edge[];
  onNodesChange: OnNodesChange<ZapNodeType>;
  onEdgesChange: OnEdgesChange<Edge>;
  onConnect: (connection: Connection) => void;
}

export const ZapCanvas: React.FC<ZapCanvasProps> = (props) => {
  return (
    <ReactFlow
      fitView
      nodeTypes={nodeTypes}
      nodes={props.nodes}
      edges={props.edges}
      onNodesChange={props.onNodesChange}
      onEdgesChange={props.onEdgesChange}
      onConnect={props.onConnect}
    >
      <Controls className="text-black" />
      <Background gap={12} size={1} />
    </ReactFlow>
  );
};
