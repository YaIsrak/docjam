import CanvasBoard from '@/components/CanvasBoard';
import CanvasNav from '@/components/CanvasNav';
import CanvasSide from '@/components/CanvasSide';
import { ClientCursorWrapper } from '@/components/ClientCursorWrapper';
import Toolbar from '@/components/toolbar';

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function CanvasPage({ params }: PageProps) {
	const { id } = await params;

	return (
		<div className='relative min-h-screen overflow-hidden'>
			<ClientCursorWrapper />
			<CanvasNav />
			<CanvasSide />

			{/* toolbar */}
			<div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
				<Toolbar />
			</div>
			<CanvasBoard />
		</div>
	);
}
