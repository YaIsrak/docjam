import { model, models, Schema } from 'mongoose';

const canvasSchema = new Schema(
	{
		drawingActions: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	},
);

export const Canvas = models.Canvas || model('Canvas', canvasSchema, 'canvas');
