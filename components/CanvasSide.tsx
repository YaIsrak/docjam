import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function CanvasSide() {
	return (
		<div className='absolute top-4 right-4'>
			<div className='bg-white rounded-xl p-2'>
				{/* title */}
				<div className='flex items-center gap-2'>
					<Avatar className='size-5'>
						<AvatarImage src={'https://github.com/shadcn.png'} />
						<AvatarFallback>IMG</AvatarFallback>
					</Avatar>
					<h1 className='font-semibold text-sm'>Shacn</h1>
				</div>
			</div>
		</div>
	);
}
