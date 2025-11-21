'use server';

import { revalidatePath } from 'next/cache';
import { dbConnect } from '../db';
import { Canvas } from '../model/canvas.model';
import { File } from '../model/file.model';
import { replaceMongoIdInObject } from '../utils';

export const createCanvas = async (userId: string) => {
	try {
		dbConnect();

		if (!userId) throw new Error('User ID is required');

		const newCanvas = await Canvas.create({});
		if (!newCanvas) throw new Error('Failed to create canvas');

		const newFile = await File.create({
			user: userId,
			canvas: replaceMongoIdInObject(newCanvas).id,
		});
		if (!newFile) throw new Error('Failed to create file');

		revalidatePath('/jam');
		return replaceMongoIdInObject(newFile);
	} catch (error) {
		throw error;
	}
};
