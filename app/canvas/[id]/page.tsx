import CanvasBoard from '@/components/CanvasBoard';
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
			<div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
				<Toolbar />
			</div>
			<CanvasBoard />
		</div>
	);
}
