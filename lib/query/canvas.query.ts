'use server';

import { dbConnect } from '../db';
import { File } from '../model/file.model';
import { replaceMongoIdInArray } from '../utils';

export const getFilesByUserId = async (userId: string) => {
	try {
		dbConnect();

		if (!userId) throw new Error('User ID is required');
		const files = await File.find({ user: userId })
			.sort({ createdAt: -1 })
			.populate('canvas');
		return replaceMongoIdInArray(files);
	} catch (error) {
		console.log(error);
	}
};
