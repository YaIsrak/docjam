'use client';
import { Loader2, Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function NewDiagramButton() {
	const [loading, setLoading] = useState(true);

	const handleClick = async () => {
		try {
		} catch (error) {
			toast.error('Failed to create canvas', {
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
