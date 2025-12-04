interface DrawingAction {
	path: [number, number][];
	style: { color: string; size: number };
}

interface FileType {
	id: string;
	title: string;
	type: 'canvas' | 'doc' | 'diagram';
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
