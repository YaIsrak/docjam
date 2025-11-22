import * as React from 'react';
import { toast } from 'sonner';

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
	const [copiedText, setCopiedText] = React.useState<CopiedValue>(null);

	const copy: CopyFn = React.useCallback(async (text) => {
		if (!navigator?.clipboard) {
			toast.error('Clipboard API not supported');
			return false;
		}

		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			return true;
		} catch (error) {
			toast.error('Failed to copy text to clipboard', {
				description: (error as Error).message,
			});
			setCopiedText(null);
			return false;
		}
	}, []);

	return [copiedText, copy];
}
