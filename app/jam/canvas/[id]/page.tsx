import CanvasBoard from '@/components/CanvasBoard';
import CanvasNav from '@/components/CanvasNav';
import CanvasSide from '@/components/CanvasSide';
import { ClientCursorWrapper } from '@/components/ClientCursorWrapper';
import Toolbar from '@/components/toolbar';
import { getFileById } from '@/lib/query/file.query';
import { getSession } from '@/lib/query/getSession';
import { redirect } from 'next/navigation';

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function CanvasPage({ params }: PageProps) {
	const { id } = await params;
	const { user } = await getSession();
	const file = await getFileById(id);

	if (!file) redirect('/jam');
	if (file.user.toString() !== user.id) redirect('/jam');
	if (file.type !== 'canvas') redirect('/jam');

	return (
		<div className='relative min-h-screen overflow-hidden'>
			<ClientCursorWrapper />
			<CanvasNav
				fileId={id}
				title={file.title}
			/>
			<CanvasSide />

			{/* toolbar */}
			<div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
				<Toolbar />
			</div>
			<CanvasBoard />
		</div>
	);
}
