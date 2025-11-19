'use client';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { BACKGROUND_COLOR } from '@/lib/constant';
import useCanvasStore from '@/lib/stores/useCanvasStore';
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
		<div className='cursor-crosshair'>
			<canvas
				ref={canvasRef}
				onMouseDown={startDrawing}
				onMouseMove={draw}
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
