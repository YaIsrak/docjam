import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	EditIcon,
	FileText,
	MoreVertical,
	Palette,
	PencilRuler,
	Trash,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const typeIconMap = {
	doc: FileText,
	prototype: PencilRuler,
	canvas: Palette,
} as const;

export function FileCard({ file }: { file: FileType }) {
	const Icon = typeIconMap[file.type];

	return (
		<Link href={`/jam/${file.type}/${file.id}`}>
			<Card className='hover:border-primary transition-all duration-200 cursor-pointer shadow-none'>
				<CardHeader className='p-0 border-b border-gray-300 h-32 relatives flex items-center justify-center'>
					<Icon className='h-10 w-10 text-primary' />
				</CardHeader>
				<CardContent className='pt-3 pb-2 px-4 flex justify-between items-center'>
					<div className='flex flex-col'>
						<p className='text-xs text-muted-foreground'>{file.type}</p>
						<CardTitle className='text-base font-medium truncate'>
							{file.title}
						</CardTitle>
						<CardDescription className='text-xs text-muted-foreground mt-0'>
							Edited {new Date(file.updatedAt).toLocaleDateString()}
						</CardDescription>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								size={'icon'}
								className='cursor-pointer'>
								<MoreVertical className='h-4 w-4' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<EditIcon className='h-4 w-4 mr-2' />
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem className='text-destructive'>
								<Trash className='h-4 w-4 mr-2 text-destructive' />
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</CardContent>
			</Card>
		</Link>
	);
}
