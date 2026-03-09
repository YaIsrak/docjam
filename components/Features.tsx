'use client';

import {
	Layers,
	MousePointer2,
	Share2,
	Shield,
	Users,
	Zap,
} from 'lucide-react';

const features = [
	{
		name: 'Real-time Collaboration',
		description:
			'Work together with your team in real-time on a single canvas. See edits as they happen.',
		icon: Users,
		color: 'text-blue-500',
		bg: 'bg-blue-500/10',
	},
	{
		name: 'Instant Sharing',
		description:
			'Share your work instantly with a link. Control access with granular permissions.',
		icon: Share2,
		color: 'text-primary',
		bg: 'bg-primary/10',
	},
	{
		name: 'Infinite Canvas',
		description:
			'Never run out of space. Our infinite canvas lets you map out the biggest ideas.',
		icon: Layers,
		color: 'text-orange-500',
		bg: 'bg-orange-500/10',
	},
	{
		name: 'Advanced Tools',
		description:
			'Full suite of drawing and diagramming tools designed for modern workflows.',
		icon: MousePointer2,
		color: 'text-purple-500',
		bg: 'bg-purple-500/10',
	},
	{
		name: 'High Performance',
		description:
			'Buttery smooth interactions even on the most complex diagrams.',
		icon: Zap,
		color: 'text-yellow-500',
		bg: 'bg-yellow-500/10',
	},
	{
		name: 'Secure & Private',
		description:
			'Enterprise-grade security to keep your intellectual property safe.',
		icon: Shield,
		color: 'text-green-500',
		bg: 'bg-green-500/10',
	},
];

export function Features() {
	return (
		<section
			id='features'
			className='py-24 bg-background relative overflow-hidden'>
			<div className='container px-4 mx-auto'>
				<div className='max-w-2xl mx-auto text-center mb-16'>
					<h2 className='text-base font-semibold leading-7 text-primary mb-2'>
						Features
					</h2>
					<p className='mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl'>
						Everything you need to <br /> visualize together
					</p>
					<p className='mt-6 text-lg leading-8 text-muted-foreground'>
						Docjam provides a powerful set of tools to help you and your
						team bring ideas to life, from simple sketches to complex
						system architectures.
					</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{features.map((feature) => (
						<div
							key={feature.name}
							className='relative p-8 rounded-3xl border border-border bg-card/50 hover:bg-card hover:shadow-xl transition-all duration-300 group'>
							<div
								className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
								<feature.icon className={`w-6 h-6 ${feature.color}`} />
							</div>
							<h3 className='text-xl font-bold mb-3 group-hover:text-primary transition-colors'>
								{feature.name}
							</h3>
							<p className='text-muted-foreground leading-relaxed'>
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
