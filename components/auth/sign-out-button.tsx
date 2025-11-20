'use client';

import { signOut } from '@/lib/auth-client';

export default function SignOutButton({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<span
			onClick={() => {
				signOut();
			}}>
			{children}
		</span>
	);
}
