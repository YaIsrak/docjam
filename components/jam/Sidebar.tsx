import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getSession } from '@/lib/query/getSession';
import { Folder, LogOutIcon } from 'lucide-react';
import SignOutButton from '../auth/sign-out-button';
import NewCanvasButton from '../buttons/new-canvas-button';
import NewDocButton from '../buttons/new-doc-button';
import NewPrototypeButton from '../buttons/new-prototype-button';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export default async function Sidebar() {
	const { user } = await getSession();

	return (
		<aside className='h-screen w-64 p-4 flex flex-col border-r border-gray-300'>
			{/* User Info */}
			<div className='flex items-center space-x-3 pb-6'>
				<Avatar className='h-10 w-10 border-primary'>
					<AvatarImage
						src={user.image as string}
						alt={user.name as string}
					/>
					<AvatarFallback>LC</AvatarFallback>
				</Avatar>
				<div className='flex flex-col'>
					<span className='text-lg font-semibold'>{user.name}</span>
					<span className='text-xs text-gray-400'>{user.email}</span>
				</div>
			</div>

			<Separator />

			{/* Create File Buttons */}
			<div className='mt-6 space-y-1'>
				<h3 className='text-xs font-semibold uppercase text-gray-500 mb-2'>
					Create
				</h3>
				<NewCanvasButton userId={user.id} />
				<NewDocButton />
				<NewPrototypeButton />
			</div>

			{/* Navigation (Optional) */}
			<div className='mt-8 space-y-1'>
				<h3 className='text-xs font-semibold uppercase text-gray-500 mb-2'>
					Projects
				</h3>
				<Button
					variant='ghost'
					size={'sm'}
					className='w-full justify-start'>
					<Folder className='mr-3 h-5 w-5' />
					Drafts
				</Button>
			</div>

			<div className='my-auto'></div>

			<SignOutButton>
				<Button
					variant='outline'
					size={'sm'}
					className='w-full justify-start'>
					<LogOutIcon className='mr-3 h-5 w-5' />
					Logout
				</Button>
			</SignOutButton>
		</aside>
	);
}
