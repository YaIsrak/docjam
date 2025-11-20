'use client';

import { throttle } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

export interface RemoteCursor {
	id: string;
	x: number;
	y: number;
}

const useMultiCursor = () => {
	const [remoteCursors, setRemoteCursors] = useState<RemoteCursor[]>([]);
	const socketRef = useRef<Socket | null>(null);

	const emitCursorMoveRef = useRef(
		// eslint-disable-next-line react-hooks/refs
		throttle((x: number, y: number) => {
			socketRef.current?.emit('cursor-move', { x, y });
		}, 50),
	);

	const emitCursorMove = useCallback((x: number, y: number) => {
		emitCursorMoveRef.current(x, y);
	}, []);

	useEffect(() => {
		if (!socketRef.current) {
			const newSocket = io('http://localhost:3000', {
				transports: ['websocket', 'polling'],
			});

			socketRef.current = newSocket;

			newSocket.on('connect', () => {
				console.log('Socket connected:', newSocket.id);
			});

			newSocket.on('disconnect', () => {
				console.log('Socket disconnected:', newSocket.id);
				setRemoteCursors([]);
			});
		}

		const socket = socketRef.current!;

		const handleCursorUpdate = (cursorData: RemoteCursor) => {
			if (cursorData.id === socket.id) return;

			setRemoteCursors((prevCursors) => {
				const existingIndex = prevCursors.findIndex(
					(c) => c.id === cursorData.id,
				);

				if (existingIndex !== -1) {
					const newCursors = [...prevCursors];
					newCursors[existingIndex] = {
						...newCursors[existingIndex],
						x: cursorData.x,
						y: cursorData.y,
					};
					return newCursors;
				} else {
					return [...prevCursors, cursorData];
				}
			});
		};

		const handleCursorRemove = (id: string) => {
			setRemoteCursors((prevCursors) =>
				prevCursors.filter((c) => c.id !== id),
			);
		};

		// Setup listeners
		socket.on('cursor-update', handleCursorUpdate);
		socket.on('cursor-remove', handleCursorRemove);

		// Cleanup
		return () => {
			socket.off('cursor-update', handleCursorUpdate);
			socket.off('cursor-remove', handleCursorRemove);
		};
	}, []);

	return { remoteCursors, emitCursorMove };
};

export default useMultiCursor;
