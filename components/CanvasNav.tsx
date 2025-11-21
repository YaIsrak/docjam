'use client';

import { changeFileTitle } from '@/lib/actions/file.action';
import { useDebounce } from '@uidotdev/usehooks';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Input } from './ui/input';

export default function CanvasNav({ fileId }: { fileId: string }) {
	const [name, setName] = useState('Untitled');
	const debouncedName = useDebounce(name, 500);
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	useEffect(() => {
		if (debouncedName !== 'Untitled') {
			const handleTitleChange = async () => {
				setLoading(true);
				try {
					await changeFileTitle(fileId, debouncedName);
				} catch (error) {
					toast.error('Failed to change title', {
						description: (error as Error).message,
					});
				} finally {
					setLoading(false);
				}
			};

			handleTitleChange();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedName]);

	return (
		<div className='absolute top-4 left-4'>
			<div className='bg-white rounded-xl p-2'>
				<div className='flex items-center justify-center gap-2'>
					<Link href='/'>
						<Image
							src='/logo.png'
							alt='logo'
							width={32}
							height={32}
						/>
					</Link>

					<div className='flex items-center'>
						<Input
							className='border-none shadow-none '
							value={name}
							onChange={handleChange}
						/>

						{loading && (
							<Loader2 className='animate-spin absolute right-4' />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
