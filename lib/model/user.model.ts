import { model, models, Schema } from 'mongoose';

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: String,
			required: false,
			trim: true,
		},
		emailVerified: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

export const User = models.User || model('User', userSchema, 'user');
