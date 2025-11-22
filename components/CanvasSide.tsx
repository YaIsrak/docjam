import { Share2 } from 'lucide-react';
import { CopyToClipboard } from './CopyToClipboard';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function CanvasSide({
	user,
	canvasId,
}: {
	user: UserType;
	canvasId: string;
}) {
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/jam/canvas/${canvasId}`;
	return (
		<div className='absolute top-4 right-4'>
			<div className='bg-white rounded-xl p-2'>
				{/* title */}
				<div className='flex items-center gap-2'>
					<Avatar className='size-5'>
						<AvatarImage src={user.image || undefined} />
						<AvatarFallback>IMG</AvatarFallback>
					</Avatar>
					<h1 className='font-semibold text-sm'>{user.name}</h1>

					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button size='icon'>
								<Share2 />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<CopyToClipboard text={url} />
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	);
}
