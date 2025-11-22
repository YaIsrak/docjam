'use client';

import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function CopyToClipboard({ text }: { text: string }) {
	const [copiedText, copy] = useCopyToClipboard();
	const [lastCopiedId, setLastCopiedId] = useState<number | null>(null);

	const handleCopy = async (text: string, id: number) => {
		try {
			const success = await copy(text);
			if (success) {
				setLastCopiedId(id);
				toast.success('Copied to clipboard', {
					description: copiedText,
				});

				setTimeout(() => {
					setLastCopiedId(null);
				}, 2000);
			} else {
				toast.error('Failed to copy text');
			}
		} catch (error) {
			toast.error('Copy failed:', {
				description: (error as Error).message,
			});
		}
	};

	useEffect(() => {
		return () => setLastCopiedId(null);
	}, []);

	return (
		<div className='grid gap-4'>
			<div className='flex items-center justify-between p-4 rounded-lg bg-card'>
				<div className='space-y-1 flex-1 mr-4'>
					<p className='text-sm font-medium'>
						Share this url to collaborate
					</p>
					<code className='text-xs bg-muted p-1 rounded'>{text}</code>
				</div>
				<Button
					variant='outline'
					size='icon'
					onClick={() => handleCopy(text, 0)}
					className='h-8 w-8'>
					{lastCopiedId === 0 ? (
						<Check className='h-4 w-4 text-green-500' />
					) : (
						<Copy className='h-4 w-4' />
					)}
				</Button>
			</div>
		</div>
	);
}
