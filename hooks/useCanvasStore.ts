import { BACKGROUND_COLOR } from '@/lib/constant';
import { create } from 'zustand';

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
	undoneActions: DrawingAction[];
	currentPath: [number, number][];
	setCanvasRef: (ref: React.RefObject<HTMLCanvasElement | null>) => void;
	setContextRef: (
		ref: React.MutableRefObject<CanvasRenderingContext2D | null>,
	) => void;
	setDrawingActions: (actions: DrawingAction[]) => void;
	setActiveTool: (tool: 'pencil' | 'eraser') => void;
	startDrawing: (e: React.MouseEvent<HTMLCanvasElement>) => void;
	draw: (e: React.MouseEvent<HTMLCanvasElement>) => void;
	endDrawing: () => DrawingAction | undefined;
	changeColor: (color: string) => void;
	changeWidth: (width: number) => void;
	undoDrawing: () => void;
	redoDrawing: () => void;
	clearDrawing: () => void;
	redrawCanvas: (inProgressPath?: [number, number][]) => void;
}

const useCanvasStore = create<CanvasState>((set, get) => {
	const drawPath = (ctx: CanvasRenderingContext2D, action: DrawingAction) => {
		ctx.beginPath();

		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
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

	const getCoordinates = (
		e:
			| React.MouseEvent<HTMLCanvasElement>
			| React.TouchEvent<HTMLCanvasElement>,
	) => {
		const { canvasRef } = get();
		if (!canvasRef?.current) return null;

		const canvas = canvasRef.current;
		const rect = canvas.getBoundingClientRect();

		let clientX, clientY;

		if ('touches' in e) {
			if (e.touches.length === 0) return null;
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		} else {
			clientX = e.clientX;
			clientY = e.clientY;
		}

		const x = clientX - rect.left;
		const y = clientY - rect.top;
		return [x, y] as [number, number];
	};

	return {
		canvasRef: null,
		contextRef: null,
		drawing: false,
		activeTool: 'pencil',
		currentColor: 'black',
		brushSize: 5,
		currentStyle: {
			color: 'black',
			size: 3,
		},
		drawingActions: [],
		undoneActions: [],
		currentPath: [],

		setCanvasRef: (ref) => set({ canvasRef: ref }),
		setContextRef: (ref) => set({ contextRef: ref }),
		setDrawingActions: (actions) => set({ drawingActions: actions }),
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

			if (inProgressPath && inProgressPath.length > 0) {
				const styleForCurrentPath =
					activeTool === 'eraser'
						? { ...currentStyle, color: BACKGROUND_COLOR }
						: currentStyle;
				drawPath(ctx, { path: inProgressPath, style: styleForCurrentPath });
			}
		},

		startDrawing: (e) => {
			const coordinates = getCoordinates(e);
			if (!coordinates) return;

			set({
				drawing: true,
				currentPath: [coordinates],
				undoneActions: [],
			});
		},

		draw: (e) => {
			const { drawing, currentPath, redrawCanvas } = get();
			if (!drawing) return;

			const coordinates = getCoordinates(e);
			if (!coordinates) return;

			const newCurrentPath: [number, number][] = [
				...currentPath,
				coordinates,
			];
			set({ currentPath: newCurrentPath });
			redrawCanvas(newCurrentPath);
		},

		endDrawing: () => {
			const {
				drawing,
				contextRef,
				currentPath,
				currentStyle,
				activeTool,
				redrawCanvas,
			} = get();
			if (!drawing || !contextRef?.current) return;

			contextRef.current.closePath();

			let newAction: DrawingAction | undefined;
			if (currentPath.length > 0) {
				const styleForAction: DrawingAction['style'] =
					activeTool === 'eraser'
						? { ...currentStyle, color: BACKGROUND_COLOR }
						: currentStyle;

				newAction = { path: currentPath, style: styleForAction };
				set((state) => ({
					drawingActions: [...state.drawingActions, newAction!],
				}));
			}
			set({ drawing: false, currentPath: [] });
			redrawCanvas();
			return newAction;
		},

		changeColor: (color) => {
			set((state) => ({
				currentColor: color,
				currentStyle: {
					...state.currentStyle,
					color:
						state.activeTool === 'pencil'
							? color
							: state.currentStyle.color,
				},
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
				const lastAction = drawingActions[drawingActions.length - 1];

				set((state) => ({
					drawingActions: state.drawingActions.slice(0, -1),
					undoneActions: [...state.undoneActions, lastAction],
				}));
				redrawCanvas();
			}
		},

		redoDrawing: () => {
			const { undoneActions, redrawCanvas } = get();
			if (undoneActions.length > 0) {
				const actionToRedo = undoneActions[undoneActions.length - 1];

				set((state) => ({
					undoneActions: state.undoneActions.slice(0, -1),
					drawingActions: [...state.drawingActions, actionToRedo],
				}));
				redrawCanvas();
			}
		},

		clearDrawing: () => {
			set({ drawingActions: [], undoneActions: [], currentPath: [] });
			get().redrawCanvas();
		},
	};
});

export default useCanvasStore;
