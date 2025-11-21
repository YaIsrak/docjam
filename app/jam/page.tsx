import { FileCard } from '@/components/jam/FileCard';
import Sidebar from '@/components/jam/Sidebar';
import { getFilesByUserId } from '@/lib/query/canvas.query';
import { getSession } from '@/lib/query/getSession';

export default async function JamPage() {
	const { user } = await getSession();
	const files: FileType[] | undefined = await getFilesByUserId(user.id);

	// console.log(files[0]);

	return (
		<div className='flex min-h-screen bg-gray-50'>
			<Sidebar />

			<main className='flex-1 p-8 overflow-y-auto'>
				<header className='mb-8 flex justify-between items-center'>
					<h1 className='text-3xl font-semibold'>Recent Files</h1>
				</header>

				{/* File Grid List */}
				<section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'>
					{files?.map((file, index) => (
						<FileCard
							key={index}
							file={file}
						/>
					))}
				</section>
			</main>
		</div>
	);
}
