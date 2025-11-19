'use client';

import useCanvasStore from '@/stores/useCanvasStore';
import { useEffect } from 'react';

const MIN_BRUSH_SIZE = 1;
const MAX_BRUSH_SIZE = 30;

export function useKeyboardShortcuts() {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Don't trigger shortcuts if the user is typing in an input.
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			) {
				return;
			}

			const { setActiveTool, changeWidth, brushSize } =
				useCanvasStore.getState();

			switch (e.key) {
				case 'p':
				case 'P':
					e.preventDefault();
					setActiveTool('pencil');
					break;
				case 'e':
				case 'E':
					e.preventDefault();
					setActiveTool('eraser');
					break;
				case '[':
					e.preventDefault();
					changeWidth(Math.max(MIN_BRUSH_SIZE, brushSize - 1));
					break;
				case ']':
					e.preventDefault();
					changeWidth(Math.min(MAX_BRUSH_SIZE, brushSize + 1));
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []); // Empty dependency array ensures this runs only once.
}
