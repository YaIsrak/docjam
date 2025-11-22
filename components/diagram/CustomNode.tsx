import { Handle, Position } from '@xyflow/react';
import { X } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { Button } from '../ui/button';

interface CustomNodeData {
	label: string;
}

interface CustomNodeProps {
	id: string;
	data: CustomNodeData;
	setNodes?: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function CustomNode({ data, setNodes }: CustomNodeProps) {
	const [text, setText] = useState(data.label);

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	}, []);

	const onDelete = () => {
		if (setNodes)
			setNodes((nds) => nds.filter((n) => n.data.label !== data.label));
	};

	return (
		<div className='bg-white px-5 py-3 text-sm shadow-none text-center relative inline-block border border-border rounded-md'>
			<input
				value={text}
				onChange={onChange}
				role='textbox'
				className='focus:outline-none text-center'
			/>
			<Handle
				position={Position.Top}
				type='target'
				style={{
					background: 'oklch(58.5% 0.233 277.117)',
					width: '8px',
					height: '8px',
				}}
			/>
			<Handle
				position={Position.Bottom}
				type='source'
				style={{
					background: 'oklch(65.6% 0.241 354.308)',
					width: '8px',
					height: '8px',
				}}
			/>
			<Button
				variant='outline'
				size='icon'
				onClick={onDelete}
				className='absolute left-full top-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-99999 pointer-events-auto rounded-full size-3'>
				<X className='size-1' />
			</Button>
		</div>
	);
}
