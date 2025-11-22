'use client';

import useCanvasStore from '@/hooks/useCanvasStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import useMultiCursor from '@/hooks/useMultiCursor';
import useSocket from '@/hooks/useSocket';
import { BACKGROUND_COLOR } from '@/lib/constant';
import { useEffect, useRef } from 'react';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

export default function CanvasBoard({
	canvasId,
	intialDrawingActions,
}: {
	canvasId: string;
	intialDrawingActions?: any[];
}) {
	useKeyboardShortcuts();
	const socket = useSocket('http://localhost:3000');

	const startDrawing = useCanvasStore((s) => s.startDrawing);
	const draw = useCanvasStore((s) => s.draw);
	const endDrawing = useCanvasStore((s) => s.endDrawing);
	const setCanvasRef = useCanvasStore((s) => s.setCanvasRef);
	const setContextRef = useCanvasStore((s) => s.setContextRef);
	const redrawCanvas = useCanvasStore((s) => s.redrawCanvas);
	const setDrawingActions = useCanvasStore((s) => s.setDrawingActions);
	const addDrawingAction = useCanvasStore((s) => s.addDrawingAction);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);

	const { emitCursorMove } = useMultiCursor();

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		draw(e);

		emitCursorMove(e.clientX, e.clientY);
	};

	const handleEndDrawing = () => {
		const drawingAction = endDrawing();
		if (socket && drawingAction) {
			socket.emit('drawing', { canvasId, drawingAction });
		}
	};

	useEffect(() => {
		if (intialDrawingActions) {
			setDrawingActions(intialDrawingActions);
		}
	}, [intialDrawingActions, setDrawingActions]);

	useEffect(() => {
		if (socket) {
			const handleDrawing = (drawingAction: any) => {
				addDrawingAction(drawingAction);
			};
			socket.on('drawing', handleDrawing);

			return () => {
				socket.off('drawing', handleDrawing);
			};
		}
	}, [socket, addDrawingAction]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		canvas.width = CANVAS_WIDTH;
		canvas.height = CANVAS_HEIGHT;

		const ctx = canvas.getContext('2d');
		if (ctx) {
			contextRef.current = ctx;
			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';
			ctx.fillStyle = BACKGROUND_COLOR;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		setCanvasRef(canvasRef);
		setContextRef(contextRef);

		// Initial draw of any existing history
		redrawCanvas();
	}, [setCanvasRef, setContextRef, redrawCanvas]);

	useEffect(() => {
		const unsubscribe = useCanvasStore.subscribe(() => {
			redrawCanvas();
		});
		return () => unsubscribe();
	}, [redrawCanvas]);

	return (
		<div className='cursor-none'>
			<canvas
				ref={canvasRef}
				onMouseDown={startDrawing}
				onMouseMove={handleMouseMove}
				onMouseUp={handleEndDrawing}
				onMouseLeave={handleEndDrawing}
				style={{
					backgroundColor: BACKGROUND_COLOR,
					display: 'block',
					width: '100vw',
					height: '100vh',
				}}
			/>
		</div>
	);
}
