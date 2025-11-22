interface DrawingAction {
	path: [number, number][];
	style: { color: string; size: number };
}

interface FileType {
	id: string;
	title: string;
	type: 'canvas' | 'doc' | 'prototype';
	user: string;
	isPublished: boolean;
	canvas: string;
	createdAt: string;
	s;
	updatedAt: string;
}

interface CanvasType {
	id: string;
	drawingActions: DrawingAction[];
	createdAt: string;
	updatedAt: string;
}

interface UserType {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	email: string;
	emailVerified: boolean;
	name: string;
	image?: string | null | undefined;
}

// {
//   id: '691ff5a582ac45a2637871cb',
//   title: 'Untitled',
//   type: 'canvas',
//   user: '691f24052a1400b8b4ddb63d',
//   isPublished: false,
//   canvas: {
//     _id: '691ff5a582ac45a2637871c9',
//     drawingActions: [],
//     createdAt: '2025-11-21T05:16:21.045Z',
//     updatedAt: '2025-11-21T05:16:21.045Z',
//     __v: 0
//   },
//   createdAt: '2025-11-21T05:16:21.139Z',
//   updatedAt: '2025-11-21T05:16:21.139Z',
//   __v: 0
// }
