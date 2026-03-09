import Link from 'next/link';

export function Footer() {
	return (
		<footer className='border-t border-border bg-background py-12 md:py-16'>
			<div className='container px-4 mx-auto'>
				<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12'>
					<div className='col-span-2 lg:col-span-2'>
						<Link
							href='/'
							className='text-2xl font-bold text-primary mb-4 block'>
							docjam
						</Link>
						<p className='text-muted-foreground max-w-xs mt-4'>
							Making real-time collaboration easier and more intuitive
							for designers and developers worldwide.
						</p>
					</div>
					<div>
						<h3 className='font-bold mb-4 uppercase text-xs tracking-wider text-muted-foreground'>
							Product
						</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link
									href='#features'
									className='text-muted-foreground hover:text-primary transition-colors'>
									Features
								</Link>
							</li>
							<li>
								<Link
									href='#integrations'
									className='text-muted-foreground hover:text-primary transition-colors'>
									Integrations
								</Link>
							</li>
							<li>
								<Link
									href='#pricing'
									className='text-muted-foreground hover:text-primary transition-colors'>
									Pricing
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='font-bold mb-4 uppercase text-xs tracking-wider text-muted-foreground'>
							Resources
						</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link
									href='/blog'
									className='text-muted-foreground hover:text-primary transition-colors'>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href='/docs'
									className='text-muted-foreground hover:text-primary transition-colors'>
									Documentation
								</Link>
							</li>
							<li>
								<Link
									href='/support'
									className='text-muted-foreground hover:text-primary transition-colors'>
									Support
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='font-bold mb-4 uppercase text-xs tracking-wider text-muted-foreground'>
							Legal
						</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link
									href='/privacy'
									className='text-muted-foreground hover:text-primary transition-colors'>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href='/terms'
									className='text-muted-foreground hover:text-primary transition-colors'>
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className='pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground'>
					<p>
						&copy; {new Date().getFullYear()} docjam. All rights reserved.
					</p>
					<div className='flex gap-6'>
						<Link
							href='#'
							className='hover:text-primary transition-colors'>
							Twitter
						</Link>
						<Link
							href='#'
							className='hover:text-primary transition-colors'>
							GitHub
						</Link>
						<Link
							href='#'
							className='hover:text-primary transition-colors'>
							Discord
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
