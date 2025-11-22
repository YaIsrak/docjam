import {
	BaseEdge,
	EdgeLabelRenderer,
	getBezierPath,
	Position,
} from '@xyflow/react';
import { X } from 'lucide-react';
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
				<Button
					variant='outline'
					size='icon'
					onClick={onDelete}
					className='absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-99999 pointer-events-auto  rounded-full size-6'
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
