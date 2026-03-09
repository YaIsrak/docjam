'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from '@/lib/auth-client';
import { LayoutDashboard, Loader2, LogOut, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
	const { data: session, isPending } = useSession();

	return (
		<nav className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container mx-auto flex h-16 items-center justify-between px-4'>
				<div className='flex items-center gap-8'>
					<Link
						href='/'
						className='flex items-center space-x-2'>
						<Image
							src='/logo.png'
							alt='docjam'
							width={30}
							height={30}
						/>
						<span className='text-2xl font-bold tracking-tight text-primary'>
							Docjam
						</span>
					</Link>
					<div className='hidden md:flex gap-6 text-sm font-medium text-muted-foreground'>
						<Link
							href='#features'
							className='hover:text-primary transition-colors'>
							Features
						</Link>
						<Link
							href='#solutions'
							className='hover:text-primary transition-colors'>
							Solutions
						</Link>
						<Link
							href='#pricing'
							className='hover:text-primary transition-colors'>
							Pricing
						</Link>
					</div>
				</div>

				<div className='flex items-center gap-4'>
					{isPending ? (
						<Loader2 className='h-5 w-5 animate-spin text-muted-foreground' />
					) : session ? (
						<div className='flex items-center gap-4'>
							<Link href='/jam'>
								<Button
									variant='ghost'
									size='sm'
									className='hidden sm:flex'>
									<LayoutDashboard className='mr-2 h-4 w-4' />
									Dashboard
								</Button>
							</Link>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='ghost'
										className='relative h-9 w-9 rounded-full'>
										<Avatar className='h-9 w-9'>
											<AvatarImage
												src={session.user.image || ''}
												alt={session.user.name || ''}
											/>
											<AvatarFallback>
												{session.user.name?.charAt(0) || 'U'}
											</AvatarFallback>
										</Avatar>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className='w-56'
									align='end'
									forceMount>
									<DropdownMenuLabel className='font-normal'>
										<div className='flex flex-col space-y-1'>
											<p className='text-sm font-medium leading-none'>
												{session.user.name}
											</p>
											<p className='text-xs leading-none text-muted-foreground'>
												{session.user.email}
											</p>
										</div>
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Link href='/profile'>
											<User className='mr-2 h-4 w-4' />
											<span>Profile</span>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem
										className='text-destructive focus:text-destructive'
										onClick={() => signOut()}>
										<LogOut className='mr-2 h-4 w-4' />
										<span>Sign out</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					) : (
						<div className='flex items-center gap-2'>
							<Link href='/sign-in'>
								<Button
									variant='ghost'
									size='sm'>
									Sign in
								</Button>
							</Link>
							<Link href='/sign-up'>
								<Button size='sm'>Sign up</Button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
