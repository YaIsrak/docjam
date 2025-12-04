import { model, models, Schema } from 'mongoose';

const diagramSchema = new Schema(
	{
		nodes: {
			type: Array,
			default: [],
		},
		edges: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
	},
);

export const Diagram =
	models.Diagram || model('Diagram', diagramSchema, 'diagram');
