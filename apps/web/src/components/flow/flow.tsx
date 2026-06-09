"use client";

import React, { useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { ZapNode } from './zap-node';
import { Button } from '../ui/button';

const nodeTypes = {
    trigger: ZapNode,
    action: ZapNode
}

const initialNodes = [
    {
        id: '1',
        type: "trigger",
        position: {
            x: window.innerWidth / 2 - 100,
            y: 100
        },
        data: { label: 'Trigger' }
    },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const addNode = useCallback((parentId: string) => {
        const newNodeId = `${Date.now()}`;
        const parent = nodes.find((n) => n.id === parentId);

        // const lastNode = nodes[nodes.length - 1];


        const newNode = {
            id: newNodeId,
            type: "action", // later create an "action" node type
            position: {
                x: parent?.position.x ?? 100,
                y: (parent?.position.y ?? 100) + 150,
            },
            data: {
                label: "Action",
                type: "action",
                index: nodes.length + 1,
                addNode: () => addNode(newNodeId),
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
    }, [nodes, setNodes, setEdges]);



    const nodesWithCallbacks = nodes.map((node) => ({
        ...node,
        data: {
            ...node.data,
            addNode: () => addNode(node.id),
        },
    }));

    return (
        <div style={{ width: '100vw', height: '100vh' }} className='dark:text-black relative'>
            <PublishButton />
            <ReactFlow
                fitView
                nodeTypes={nodeTypes}
                nodes={nodesWithCallbacks}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >

                <Controls className='text-black' />
                <MiniMap className='' />
                <Background gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}

const PublishButton: React.FC = () => {
    return <div className='absolute top-10 right-10'>
        <Button variant={"purple"} >Publish</Button>
    </div>
}