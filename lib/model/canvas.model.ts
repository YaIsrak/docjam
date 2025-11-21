import { model, models, Schema } from 'mongoose';

const canvasSchema = new Schema(
	{
		title: {
			type: String,
			default: 'Untitled Canvas',
		},
		type: {
			type: String,
			enum: ['doc', 'prototype', 'canvas'],
			default: 'canvas',
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
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
