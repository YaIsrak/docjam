interface File {
	name: string;
	lastEdited: string;
	type: 'doc' | 'prototype' | 'canvas';
}
export const files: File[] = [
	{
		name: 'Website Redesign Concepts',
		lastEdited: '12 days ago',
		type: 'doc',
	},
	{
		name: 'User Research Summary Doc',
		lastEdited: '5 hours ago',
		type: 'prototype',
	},
	{
		name: 'Mobile App Flow Prototype',
		lastEdited: '2 months ago',
		type: 'canvas',
	},
	{
		name: 'Marketing Campaign Canvas',
		lastEdited: '3 days ago',
		type: 'canvas',
	},
	// Add more files here...
];
