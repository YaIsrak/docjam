import DiagramBoard from '@/components/diagram/DiagramBoard';

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function DiagramPage({ params }: PageProps) {
	const { id } = await params;

	return (
		<div>
			<DiagramBoard />
		</div>
	);
}
