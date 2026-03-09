'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, MousePointer2, Paintbrush, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
	return (
		<section className='relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 overflow-hidden bg-background'>
			{/* Background Gradients */}
			<div className='absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[120px] pointer-events-none' />
			<div className='absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] pointer-events-none' />

			{/* Floating Icons */}
			<div className='absolute inset-0 pointer-events-none'>
				<div className='floating-icon absolute top-1/4 left-[15%] p-4 bg-background border border-border rounded-2xl shadow-xl'>
					<MousePointer2 className='w-6 h-6 text-primary' />
				</div>
				<div className='floating-icon absolute top-1/3 right-[15%] p-4 bg-background border border-border rounded-2xl shadow-xl'>
					<Paintbrush className='w-6 h-6 text-purple-500' />
				</div>
				<div className='floating-icon absolute bottom-1/4 left-[20%] p-4 bg-background border border-border rounded-2xl shadow-xl'>
					<Share2 className='w-6 h-6 text-blue-500' />
				</div>
			</div>

			<div className='container relative z-10 px-4 mx-auto text-center'>
				<div className='max-w-4xl mx-auto'>
					<h1 className='text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70'>
						Think, draw, and <span className='text-primary'>collab</span>{' '}
						<br />
						realtime with docjam
					</h1>
					<p className='text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed'>
						The ultimate collaborative canvas for teams to brainstorm,
						design, and visualize ideas together in real-time.
					</p>
					<div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-20'>
						<Link href='/sign-up'>
							<Button
								size='lg'
								className='h-12 px-8 text-lg rounded-full group transition-all duration-300'>
								Get Started free
								<ArrowRight className='ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform' />
							</Button>
						</Link>
						<Link href='#features'>
							<Button
								variant='outline'
								size='lg'
								className='h-12 px-8 text-lg rounded-full'>
								Explore Features
							</Button>
						</Link>
					</div>
				</div>

				{/* Preview Canvas */}
				<div className='relative max-w-5xl mx-auto rounded-3xl border border-border/50 shadow-2xl overflow-hidden bg-muted/20 aspect-video group'>
					<Image
						src='/screenshot.png'
						alt='docjam Canvas Screenshot'
						width={1200}
						height={675}
						className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
					/>
					{/* Mobile/Overlay indicator */}
					<div className='absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none' />
				</div>
			</div>
		</section>
	);
}
