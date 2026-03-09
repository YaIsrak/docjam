import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { Navbar } from '@/components/Navbar';

export default function Page() {
	return (
		<main className='flex min-h-screen flex-col bg-background'>
			<Navbar />
			<Hero />
			<Features />
			<Footer />
		</main>
	);
}
