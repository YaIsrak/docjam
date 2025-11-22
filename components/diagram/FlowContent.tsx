'use client';

import {
	Background,
	Controls,
	Edge,
	MiniMap,
	Node,
	Panel,
	ReactFlow,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { DeleteIcon, Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '../ui/button';
import CustomNode from './CustomNode';
import DeleteEdge from './DeleteEdge';

const initialNodes: Node[] = [
	{
		id: 'n1',
		type: 'customNode',
		position: { x: 0, y: 0 },
		data: { label: 'Node 1' },
	},
	{
		id: 'n2',
		type: 'customNode',
		position: { x: -200, y: 200 },
		data: { label: 'Node 2' },
	},
	{
		id: 'n3',
		type: 'customNode',
		position: { x: 200, y: 200 },
		data: { label: 'Node 3' },
	},
];

const initialEdges: Edge[] = [
	{ id: 'n1-n2', source: 'n1', target: 'n2', type: 'deleteEdge' },
	{ id: 'n1-n3', source: 'n1', target: 'n3', type: 'deleteEdge' },
];

export default function FlowContent() {
	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);

	const onNodesChange = useCallback(
		(changes: any) => setNodes((ns) => applyNodeChanges(changes, ns)),
		[],
	);

	const onEdgesChange = useCallback(
		(changes: any) => setEdges((es) => applyEdgeChanges(changes, es)),
		[],
	);

	const onConnect = useCallback(
		(params: any) =>
			setEdges((es) => addEdge({ ...params, type: 'deleteEdge' }, es)),
		[],
	);

	const addNode = () => {
		const id = crypto.randomUUID();
		const newNode = {
			id,
			position: { x: Math.random() * 200, y: Math.random() * 200 },
			data: { label: `Node ${id.slice(0, 4)}` },
			type: 'customNode',
		};
		setNodes((nds) => [...nds, newNode]);
	};

	const edgeTypes = {
		deleteEdge: (edgeProps: any) => (
			<DeleteEdge
				{...edgeProps}
				setEdges={setEdges}
			/>
		),
	};

	const nodeTypes = {
		customNode: (props: any) => (
			<CustomNode
				{...props}
				setNodes={setNodes}
			/>
		),
	};

	return (
		<ReactFlow
			nodes={nodes}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			onConnect={onConnect}
			edgeTypes={edgeTypes}
			nodeTypes={nodeTypes}
			fitView>
			<Background />
			<Controls />
			<MiniMap />

			<Panel position='bottom-center'>
				<div className='border p-2 bg-white rounded-lg flex gap-2 shadow-lg'>
					<Button
						variant='outline'
						size='icon'
						onClick={addNode}>
						<Plus />
					</Button>

					<Button
						variant='outline'
						size='icon'>
						<DeleteIcon />
					</Button>
				</div>
			</Panel>
		</ReactFlow>
	);
}
