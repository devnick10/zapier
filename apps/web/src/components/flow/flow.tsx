"use client";

import { ActionType, TriggerType } from "@/lib/types";
import {
  addEdge,
  Connection,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { useCallback, useState } from "react";

import { DEFAULT_IMAGE } from "@/lib/config";
import "@xyflow/react/dist/style.css";
import { ZapNodeSelector } from "../ZapNodeSelector";
import { PublishButton } from "../publish-button";
import { ZapCanvas } from "./zap-canvas";
import { ZapNodeType } from "./zap-node";
import { OnSelecProps } from "./types";

const initialNodes: ZapNodeType[] = [
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
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(
    null,
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const [trigger, setTrigger] = useState<{ id: string, metadata: Record<string, any> } | null>(null);
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

      const newNode: ZapNodeType = {
        id: newNodeId,
        type: "action",
        position: {
          x: parent?.position.x ?? 100,
          y: (parent?.position.y ?? 100) + 150,
        },
        data: {
          label: "Action",
          index: nodes.length + 1,
          name: "",
          image: DEFAULT_IMAGE,
          availableId: "",
          metadata: {}
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
        setSelectedNodeIndex(node.data.index);
      },
    },
  }));

  const handleSelect = (item: OnSelecProps | null): void => {
    if (!item) {
      setSelectedNodeIndex(null);
      return;
    }

    if (selectedNodeIndex === 1) {
      setTrigger({
        id: item.id,
        metadata: item?.metadata || {}
      });
    } else {
      setActions((prev) => [
        ...prev,
        {
          availableActionId: item.id,
          actionMetadata: item?.metadata || {},
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
              metadata: item?.metadata
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

    setSelectedNodeIndex(null)
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="dark:text-black relative"
    >
      <PublishButton
        actions={actions}
        triggerId={trigger?.id!}
        triggerMetadata={trigger?.metadata || {}}
      />
      {selectedNodeIndex !== null && (
        <ZapNodeSelector index={selectedNodeIndex} onSelect={handleSelect} />
      )}
      <ZapCanvas
        edges={edges}
        nodes={nodesWithCallbacks}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
      />
    </div>
  );
}
