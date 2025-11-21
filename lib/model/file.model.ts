import { model, models, Schema } from 'mongoose';

const fileSchema = new Schema(
	{
		title: {
			type: String,
			default: 'Untitled',
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
		canvas: {
			type: Schema.Types.ObjectId,
			ref: 'Canvas',
		},
	},
	{
		timestamps: true,
	},
);

export const File = models.File || model('File', fileSchema, 'file');
