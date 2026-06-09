"use client";

import { TriggerType } from "@/lib/types";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useState } from "react";

import { useAvailableActionsAndTriggers } from "@/hooks/use-actions-and-triggers";
import "@xyflow/react/dist/style.css";
import { Model } from "../model";
import { PublishButton } from "../publish-button";
import { ZapNode } from "./zap-node";
const DEFAULT_IMAGE =
  "https://img.icons8.com/?size=80&id=12f0cgsMnoZM&format=png";
const nodeTypes = {
  trigger: ZapNode,
  action: ZapNode,
};

const initialNodes = [
  {
    id: "1",
    type: "trigger",
    position: {
      x: window.innerWidth / 2 - 100,
      y: 100,
    },
    data: {
      label: "Trigger",
      image: DEFAULT_IMAGE,
      name: "Trigger",
      index: 1,
    },
  },
];

const initialEdges: { id: string; source: string; target: string }[] = [];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(
    null,
  );
  const { availabelTriggers, availableActions } =
    useAvailableActionsAndTriggers();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const [trigger, setTrigger] = useState<TriggerType | null>(null);
  const [actions, setActions] = useState<
    {
      availableActionId: string;
      actionMetadata: Record<string, any>;
    }[]
  >([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNode = useCallback(
    (parentId: string) => {
      const newNodeId = `${Date.now()}`;
      const parent = nodes.find((n) => n.id === parentId);

      const newNode = {
        id: newNodeId,
        type: "action",
        position: {
          x: parent?.position.x ?? 100,
          y: (parent?.position.y ?? 100) + 150,
        },
        data: {
          label: "Action",
          type: "action",
          index: nodes.length + 1,
          name: "",
          image: DEFAULT_IMAGE,
        },
      };

      setNodes((nds) => [...nds, newNode]);
      setEdges((eds) => [
        ...eds,
        {
          id: `e-${parentId}-${newNodeId}`,
          source: parentId,
          target: newNodeId,
        },
      ]);
    },
    [nodes, setNodes, setEdges],
  );

  const nodesWithCallbacks = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onClick: () => {
        setSelectedNodeId(node.id);
        setSelectedModelIndex(node.data.index);
      },
    },
  }));

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="dark:text-black relative"
    >
      <PublishButton
        actions={actions}
        triggerId={trigger?.id!}
        triggerMetadata={{}}
      />
      {selectedModelIndex !== null && (
        <Model
          items={
            selectedModelIndex === 1 ? availabelTriggers : availableActions
          }
          index={selectedModelIndex}
          onSelect={(item) => {
            if (!item) {
              setSelectedModelIndex(null);
              return;
            }

            if (selectedModelIndex === 1) {
              setTrigger(item);
            } else {
              setActions((prev) => [
                ...prev,
                {
                  availableActionId: item.id,
                  actionMetadata: {},
                },
              ]);
            }

            setNodes((nds) =>
              nds.map((node) =>
                node.id === selectedNodeId
                  ? {
                      ...node,
                      data: {
                        ...node.data,
                        label: item.name,
                        name: item.name,
                        image: item.image,
                        availableId: item.id,
                      },
                    }
                  : node,
              ),
            );

            // Add next action node
            const selectedNode = nodes.find((n) => n.id === selectedNodeId);
            const isLastNode = nodes[nodes.length - 1]?.id === selectedNode?.id;

            if (isLastNode) {
              addNode(selectedNode.id);
            }

            setSelectedModelIndex(null);
          }}
        />
      )}
      <ReactFlow
        fitView
        nodeTypes={nodeTypes}
        nodes={nodesWithCallbacks}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls className="text-black" />
        <MiniMap className="" />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
