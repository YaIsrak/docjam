'use client';

import { Cursor, CursorProvider } from '@/components/cursor';
import RemoteCursor from '@/components/RemoteCursor';
import useMultiCursor from '@/hooks/useMultiCursor';
import { MousePointer2 } from 'lucide-react';

export function ClientCursorWrapper({ user }: { user: UserType }) {
	const { remoteCursors } = useMultiCursor();

	return (
		<CursorProvider>
			<Cursor>
				<MousePointer2 fill='oklch(62.3% 0.214 259.815)' />
			</Cursor>

			{remoteCursors.map((cursor) => (
				<RemoteCursor
					key={cursor.id}
					id={cursor.id}
					x={cursor.x}
					y={cursor.y}
					user={user}
				/>
			))}
		</CursorProvider>
	);
}
