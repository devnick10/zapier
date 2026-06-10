"use client";

import {
  addEdge,
  Connection,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useCallback, useEffect, useState } from "react";

import { useZapById } from "@/hooks/use-zap-by-id";

import { ZapNodeType } from "@/components/flow/zap-node";
import { Button } from "@/components/ui/button";
import { ZapNodeSelector } from "@/components/ZapNodeSelector";
import { DEFAULT_IMAGE } from "@/lib/config";
import { ActionType, TriggerType } from "@/lib/types";
import { createActionNode, createTriggerNode } from "../flow/utils";
import { ZapCanvas } from "../flow/zap-canvas";
import { PageLoader } from "../page-loader";
import { useUpdateZap } from "@/hooks/use-update-zap";
import { toast } from "sonner";
import { Spinner } from "../ui/sipinner";
import { useRouter } from "next/navigation";

const initialNodes: ZapNodeType[] = [];
const initialEdges: { id: string; source: string; target: string }[] = [];

export const ZapById: React.FC<{ id: string }> = ({ id }) => {
  const { loading, zap } = useZapById(id);
  const { updateZap, loading: updateLoading } = useUpdateZap();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number | null>(
    null,
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const router = useRouter();

  useEffect(() => {
    if (!zap) return;

    const triggerNode = createTriggerNode(
      zap.triggerId,
      zap.trigger.type.name,
      zap.trigger.type.image,
      zap.trigger.availableTriggerId,
    );

    const actionNodes = createActionNode(zap.action);

    setNodes([triggerNode, ...actionNodes]);
  }, [zap]);

  // Create Edges
  useEffect(() => {
    if (!zap) return;

    const ids = [zap.triggerId, ...zap.action.map((a) => a.id)];

    const generatedEdges = ids.slice(0, -1).map((source, index) => ({
      id: `e-${source}-${ids[index + 1]}`,
      source,
      target: ids[index + 1],
    }));

    setEdges(generatedEdges);
  }, [zap]);

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
          name: "action",
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
        setSelectedNodeIndex(node.data.index);
      },
    },
  }));

  const handleSelect = (item: ActionType | TriggerType | null) => {
    if (!item) {
      setSelectedNodeId(null);
      setSelectedNodeIndex(null);
      return;
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

    const selectedNode = nodes.find((n) => n.id === selectedNodeId);

    const isLastNode = nodes[nodes.length - 1]?.id === selectedNode?.id;

    if (isLastNode && selectedNode?.id) {
      addNode(selectedNode.id);
    }

    setSelectedNodeId(null);
    setSelectedNodeIndex(null);
  };

  if (!zap) {
    return (
      <div className="h-screen flex items-center justify-center">
        Zap not found
      </div>
    );
  }

  const saveZap = async () => {
    const triggerNode = nodes[0];

    if (!triggerNode?.data?.availableTriggerId) {
      toast.error("Please select a trigger");
      return;
    }

    const payload = {
      id,
      triggerId: zap.trigger.id,
      availableTriggerId: triggerNode.data.availableTriggerId,
      actions: nodes
        .slice(1)
        //@ts-expect-error
        .filter((node) => node.data.availableId)
        .map((node) => ({
          //@ts-expect-error
          availableActionId: node.data.availableId as string,
        })),
    };

    try {
      await updateZap(payload);
      toast.success("Zap updated successfully");
      router.push("/dashboard");
    } catch {
      toast.error("Failed to update zap");
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      className="relative dark:text-black"
    >
      <div className="absolute top-8 right-8 z-50 text-white">
        <Button
          variant={"purple"}
          className="flex gap-2 items-center"
          onClick={saveZap}
        >
          Save Changes {updateLoading && <Spinner />}
        </Button>
      </div>
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
};
