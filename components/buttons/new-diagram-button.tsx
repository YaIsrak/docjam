'use client';
import { createDiagram } from '@/lib/actions/diagram.action';
import { Loader2, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function NewDiagramButton({ userId }: { userId: string }) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleClick = async () => {
		setLoading(true);
		try {
			const diagram = await createDiagram(userId);

			router.push(`/jam/diagram/${diagram.id}`);
		} catch (error) {
			toast.error('Failed to create diagram', {
				description: (error as Error).message,
			});
		}
	};

	return (
		<Button
			variant='ghost'
			size={'sm'}
			disabled={loading}
			onClick={handleClick}
			className='w-full justify-start'>
			<Share2 className='mr-3 h-5 w-5' />
			New Diagram
			{loading && <Loader2 className='mr-3 h-5 w-5 animate-spin' />}
		</Button>
	);
}
