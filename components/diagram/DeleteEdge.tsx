import {
	BaseEdge,
	EdgeLabelRenderer,
	getBezierPath,
	Position,
} from '@xyflow/react';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '../ui/button';

interface DeleteEdgeProps {
	id: string;
	sourceX: number;
	sourceY: number;
	targetX: number;
	targetY: number;
	sourcePosition: Position;
	targetPosition: Position;
	style: React.CSSProperties;
	markerEnd: string;
	setEdges: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function DeleteEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style,
	markerEnd,
	setEdges,
}: DeleteEdgeProps) {
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
	});

	const onDelete = () => {
		setEdges((eds) => eds.filter((e) => e.id !== id));
	};

	return (
		<>
			<BaseEdge
				path={edgePath}
				markerEnd={markerEnd}
				style={style}
			/>
			<EdgeLabelRenderer>
				<EdgeLabel
					transform={`translate(-50%, -40%) translate(${sourceX}px,${sourceY}px)`}
					isStart
				/>
				<EdgeLabel
					transform={`translate(-50%, -70%) translate(${targetX}px,${targetY}px)`}
				/>
				<Button
					variant='outline'
					size='icon'
					onClick={onDelete}
					className='absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-99999 pointer-events-auto  rounded-full size-5'
					style={{
						left: labelX,
						top: labelY,
					}}>
					<X className='size-2' />
				</Button>
			</EdgeLabelRenderer>
		</>
	);
}

function EdgeLabel({
	transform,
	isStart,
}: {
	transform: string;
	isStart?: boolean;
}) {
	return (
		<div
			className='absolute'
			style={{ transform }}>
			{isStart ? (
				<ChevronDown className=' text-pink-500' />
			) : (
				<ChevronDown className='text-indigo-500' />
			)}
		</div>
	);
}
