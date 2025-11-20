'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { signIn } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import GoogleIcon from '../icon';

export default function SignInForm() {
	const [loading, setLoading] = useState(false);

	const onSubmit = async () => {
		await signIn.social(
			{
				provider: 'google',
				callbackURL: '/jam',
			},
			{
				onRequest: () => {
					setLoading(true);
				},
				onResponse: () => {
					setLoading(false);
				},
			},
		);
	};

	return (
		<Card className='w-md'>
			<CardHeader>
				<div className='flex items-center justify-center'>
					<Image
						src='/logo.png'
						alt='logo'
						width={100}
						height={100}
					/>
				</div>
				<CardTitle className='text-lg md:text-xl'>
					Welcome to DocJam
				</CardTitle>
				<CardDescription className='text-xs md:text-sm'>
					Use you gmail to login
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='grid gap-4'>
					<div
						className={cn(
							'w-full gap-2 flex items-center',
							'justify-between flex-col',
						)}>
						<Button
							variant='outline'
							className={cn('w-full gap-2')}
							disabled={loading}
							onClick={onSubmit}>
							<GoogleIcon />
							Sign in with Google
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
