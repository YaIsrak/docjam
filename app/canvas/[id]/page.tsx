import CanvasBoard from '@/components/CanvasBoard';
import Toolbar from '@/components/toolbar';

export default function CanvasPage() {
	return (
		<div className='relative min-h-screen'>
			<div className='absolute bottom-4 left-1/2 -translate-x-1/2'>
				<Toolbar />
			</div>
			<CanvasBoard />
		</div>
	);
}
