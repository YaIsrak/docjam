import { FileText } from 'lucide-react';
import { Button } from '../ui/button';

export default function NewDocButton() {
	return (
		<Button
			variant='ghost'
			size={'sm'}
			className='w-full justify-start'>
			<FileText className='mr-3 h-5 w-5' />
			New Doc
		</Button>
	);
}
