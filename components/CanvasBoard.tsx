'use client';

import useCanvasStore from '@/hooks/useCanvasStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import useMultiCursor from '@/hooks/useMultiCursor';
import { BACKGROUND_COLOR } from '@/lib/constant';
import { useEffect, useRef } from 'react';

const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

export default function CanvasBoard() {
	useKeyboardShortcuts();

	const startDrawing = useCanvasStore((s) => s.startDrawing);
	const draw = useCanvasStore((s) => s.draw);
	const endDrawing = useCanvasStore((s) => s.endDrawing);
	const setCanvasRef = useCanvasStore((s) => s.setCanvasRef);
	const setContextRef = useCanvasStore((s) => s.setContextRef);
	const redrawCanvas = useCanvasStore((s) => s.redrawCanvas);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contextRef = useRef<CanvasRenderingContext2D | null>(null);

	const { emitCursorMove } = useMultiCursor();

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		draw(e);

		emitCursorMove(e.clientX, e.clientY);
	};

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
				onMouseUp={endDrawing}
				onMouseLeave={endDrawing}
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
