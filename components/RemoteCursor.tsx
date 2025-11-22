import { MousePointer2 } from 'lucide-react';

interface RemoteCursorProps {
	x: number;
	y: number;
	id: string;
	user: UserType;
}

const getColorForId = (id: string) => {
	let hash = 0;
	for (let i = 0; i < id.length; i++) {
		hash = id.charCodeAt(i) + ((hash << 5) - hash);
	}
	const color = `hsl(${hash % 360}, 70%, 50%)`;
	return color;
};

export default function RemoteCursor({ x, y, id, user }: RemoteCursorProps) {
	const color = getColorForId(id);

	return (
		<div
			className='absolute transition-transform duration-50 ease-linear pointer-events-none z-50'
			style={{
				transform: `translate3d(${x}px, ${y}px, 0)`,
			}}>
			<MousePointer2 fill={color} />
			<div
				className='absolute top-5 left-0 px-2 py-1 rounded-br-lg rounded-lg text-xs font-semibold text-white shadow-md'
				style={{ backgroundColor: color }}>
				{user.name || 'Anonymous'}
			</div>
		</div>
	);
}
