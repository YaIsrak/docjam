'use client';
import { create } from 'zustand';
import { BACKGROUND_COLOR } from '../constant';

interface CanvasState {
	canvasRef: React.RefObject<HTMLCanvasElement | null> | null;
	contextRef: React.MutableRefObject<CanvasRenderingContext2D | null> | null;
	drawing: boolean;
	activeTool: 'pencil' | 'eraser';
	currentColor: string;
	brushSize: number;
	currentStyle: {
		color: string;
		size: number;
	};
	drawingActions: DrawingAction[];
	currentPath: [number, number][];
	setCanvasRef: (ref: React.RefObject<HTMLCanvasElement | null>) => void;
	setContextRef: (
		ref: React.MutableRefObject<CanvasRenderingContext2D | null>,
	) => void;
	setActiveTool: (tool: 'pencil' | 'eraser') => void;
	startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void;
	draw: (e: React.MouseEvent<HTMLCanvasElement>) => void;
	endDrawing: () => void;
	changeColor: (color: string) => void;
	changeWidth: (width: number) => void;
	undoDrawing: () => void;
	clearDrawing: () => void;
	redrawCanvas: (inProgressPath?: [number, number][]) => void;
}

const useCanvasStore = create<CanvasState>((set, get) => {
	const drawPath = (ctx: CanvasRenderingContext2D, action: DrawingAction) => {
		ctx.beginPath();
		ctx.strokeStyle = action.style.color;
		ctx.lineWidth = action.style.size;
		if (action.path.length > 0) {
			ctx.moveTo(action.path[0][0], action.path[0][1]);
			for (let i = 1; i < action.path.length; i++) {
				ctx.lineTo(action.path[i][0], action.path[i][1]);
			}
			ctx.stroke();
		}
	};

	return {
		canvasRef: null,
		contextRef: null,
		drawing: false,
		activeTool: 'pencil',
		currentColor: 'red',
		brushSize: 5,
		currentStyle: {
			color: 'black',
			size: 3,
		},
		drawingActions: [],
		currentPath: [],

		setCanvasRef: (ref) => set({ canvasRef: ref }),
		setContextRef: (ref) => set({ contextRef: ref }),
		setActiveTool: (tool) => set({ activeTool: tool }),

		redrawCanvas: (inProgressPath?: [number, number][]) => {
			const {
				contextRef,
				canvasRef,
				drawingActions,
				currentStyle,
				activeTool,
			} = get();
			if (!contextRef?.current || !canvasRef?.current) return;

			const ctx = contextRef.current;
			const canvas = canvasRef.current;

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = BACKGROUND_COLOR;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			drawingActions.forEach((action) => drawPath(ctx, action));

			if (inProgressPath) {
				const styleForCurrentPath =
					activeTool === 'eraser'
						? { ...currentStyle, color: BACKGROUND_COLOR }
						: currentStyle;
				drawPath(ctx, { path: inProgressPath, style: styleForCurrentPath });
			}
		},

		startDrawing: (e) => {
			const { canvasRef } = get();
			if (!canvasRef?.current) return;

			const canvas = canvasRef.current;
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			set({ drawing: true, currentPath: [[x, y]] });
		},

		draw: (e) => {
			const { drawing, canvasRef, currentPath, redrawCanvas } = get();
			if (!drawing || !canvasRef?.current) return;

			const canvas = canvasRef.current;
			const rect = canvas.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const newCurrentPath: [number, number][] = [
				...currentPath,
				[x, y] as [number, number],
			];
			set({ currentPath: newCurrentPath });
			redrawCanvas(newCurrentPath);
		},

		endDrawing: () => {
			const { drawing, contextRef, currentPath, currentStyle, activeTool } =
				get();
			if (!drawing || !contextRef?.current) return;

			contextRef.current.closePath();
			if (currentPath.length > 0) {
				const styleForAction =
					activeTool === 'eraser'
						? { ...currentStyle, color: BACKGROUND_COLOR }
						: currentStyle;

				set((state) => ({
					drawingActions: [
						...state.drawingActions,
						{ path: currentPath, style: styleForAction },
					],
				}));
			}
			set({ drawing: false, currentPath: [] });
		},

		changeColor: (color) => {
			set((state) => ({
				currentColor: color,
				currentStyle: { ...state.currentStyle, color },
			}));
		},

		changeWidth: (width) => {
			set((state) => ({
				brushSize: width,
				currentStyle: { ...state.currentStyle, size: width },
			}));
		},

		undoDrawing: () => {
			const { drawingActions, redrawCanvas } = get();
			if (drawingActions.length > 0) {
				set({ drawingActions: drawingActions.slice(0, -1) });
				redrawCanvas();
			}
		},

		clearDrawing: () => {
			set({ drawingActions: [], currentPath: [] });
			get().redrawCanvas();
		},
	};
});

export default useCanvasStore;
