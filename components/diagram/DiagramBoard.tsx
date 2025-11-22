'use client';

import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FlowContent from './FlowContent';

export default function DiagramBoard() {
	return (
		<div className='w-full h-screen'>
			<div className='w-full h-screen bg-gray-50'>
				<ReactFlowProvider>
					<FlowContent />
				</ReactFlowProvider>
			</div>
		</div>
	);
}
