'use server';

import { revalidatePath } from 'next/cache';
import { dbConnect } from '../db';
import { Canvas } from '../model/canvas.model';
import { replaceMongoIdInObject } from '../utils';

export const createCanvas = async (userId: string) => {
	try {
		dbConnect();

		if (!userId) throw new Error('User ID is required');

		const newCanvas = await Canvas.create({ user: userId });

		revalidatePath('/jam');
		return replaceMongoIdInObject(newCanvas);
	} catch (error) {
		throw error;
	}
};
