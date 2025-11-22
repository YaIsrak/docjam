import { Toaster } from '@/components/ui/sonner';
import '@xyflow/react/dist/style.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'DocJam',
	description: 'A platform for developers to share their knowledge',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			suppressContentEditableWarning>
			<body className={` ${inter.className} antialiased`}>
				{children}

				<Toaster richColors />
			</body>
		</html>
	);
}
