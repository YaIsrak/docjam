'use client';

import { createCanvas } from '@/lib/actions/canvas.action';
import { LayoutGrid, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function NewCanvasButton({ userId }: { userId: string }) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleClick = async () => {
		setLoading(true);
		try {
			const canvas = await createCanvas(userId);
			router.push(`/jam/canvas/${canvas.id}`);
		} catch (error) {
			toast.error('Failed to create canvas', {
				description: (error as Error).message,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			variant='ghost'
			size={'sm'}
			disabled={loading}
			onClick={handleClick}
			className='w-full justify-start'>
			<LayoutGrid className='mr-3 h-5 w-5' />
			New Canvas
			{loading && <Loader2 className='mr-3 h-5 w-5 animate-spin' />}
		</Button>
	);
}
