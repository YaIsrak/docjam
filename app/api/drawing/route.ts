import { saveCanvasDrawing } from '@/lib/actions/canvas.action';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { canvasId, drawingAction } = body;

		if (!canvasId || !drawingAction) {
			return NextResponse.json(
				{ message: 'Missing canvasId or drawingAction' },
				{ status: 400 },
			);
		}

		await saveCanvasDrawing(canvasId, drawingAction);

		return NextResponse.json(
			{ message: 'Drawing saved successfully' },
			{ status: 200 },
		);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('API Error saving drawing:', error);
		return NextResponse.json(
			{ message: 'Failed to save drawing' },
			{ status: 500 },
		);
	}
}
