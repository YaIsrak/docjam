'use server';

import { revalidatePath } from 'next/cache';
import { dbConnect } from '../db';
import { File } from '../model/file.model';
import { replaceMongoIdInObject } from '../utils';

export const changeFileTitle = async (fileId: string, title: string) => {
	try {
		dbConnect();
		if (!fileId) throw new Error('File ID is required');

		const updatedFile = await File.findByIdAndUpdate(
			fileId,
			{ title },
			{ new: true },
		);
		if (!updatedFile) throw new Error('Failed to update File');

		revalidatePath('/jam');
		return replaceMongoIdInObject(updatedFile);
	} catch (error) {
		throw error;
	}
};

export const deleteFile = async (fileId: string) => {
	try {
		dbConnect();
		if (!fileId) throw new Error('File ID is required');

		const deletedFile = await File.findByIdAndDelete(fileId);
		if (!deletedFile) throw new Error('Failed to delete File');

		revalidatePath('/jam');
		return replaceMongoIdInObject(deletedFile);
	} catch (error) {
		throw error;
	}
};
