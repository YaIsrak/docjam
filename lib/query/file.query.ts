'use server';

import { dbConnect } from '../db';
import { File } from '../model/file.model';
import { replaceMongoIdInArray, replaceMongoIdInObject } from '../utils';

export const getFilesByUserId = async (userId: string) => {
	try {
		dbConnect();

		if (!userId) throw new Error('User ID is required');
		const files = await File.find({ user: userId })
			.sort({ createdAt: -1 })
			.populate('canvas');
		return replaceMongoIdInArray(files);
	} catch (error) {
		throw error;
	}
};

export const getFileById = async (fileId: string) => {
	try {
		dbConnect();

		if (!fileId) throw new Error('File ID is required');

		const file = await File.findById(fileId).populate('canvas');
		return replaceMongoIdInObject(file);
	} catch (error) {
		throw error;
	}
};
