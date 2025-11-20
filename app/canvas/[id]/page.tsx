import CanvasBoard from '@/components/CanvasBoard';
import { Cursor, CursorProvider } from '@/components/cursor';
import Toolbar from '@/components/toolbar';
import { MousePointer2 } from 'lucide-react';

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function CanvasPage({ params }: PageProps) {
	const { id } = await params;

	// console.log('Id : ', id);

	return (
		<div className='relative min-h-screen'>
			<CursorProvider>
				<Cursor>
					<MousePointer2 fill='oklch(62.3% 0.214 259.815)' />
				</Cursor>
				{/* <CursorFollow>
					<div className='bg-blue-500 text-white px-2 py-1 rounded-lg text-sm shadow-lg'>
						User 1
					</div>
				</CursorFollow> */}
			</CursorProvider>
			<div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
				<Toolbar />
			</div>
			<CanvasBoard />
		</div>
	);
}
