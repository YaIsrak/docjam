'use client';

import { deleteFile } from '@/lib/actions/file.action';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';
import { DropdownMenuItem } from '../ui/dropdown-menu';

export default function FileDeleteButton({ fileId }: { fileId: string }) {
	const handleDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		try {
			await deleteFile(fileId);
			toast.success('File deleted successfully');
		} catch (error) {
			toast.error('Failed to delete file', {
				description: (error as Error).message,
			});
		}
	};
	return (
		<DropdownMenuItem
			className='text-destructive'
			onClick={handleDelete}>
			<Trash className='h-4 w-4 mr-2 text-destructive' />
			Delete
		</DropdownMenuItem>
	);
}
