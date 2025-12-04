'use server';

import { Edge, Node } from '@xyflow/react';
import { revalidatePath } from 'next/cache';
import { dbConnect } from '../db';
import { Diagram } from '../model/diagram.model';
import { File } from '../model/file.model';
import { replaceMongoIdInObject } from '../utils';

export const createDiagram = async (userId: string) => {
	try {
		dbConnect();

		if (!userId) throw new Error('User ID is required');

		const newDiagram = await Diagram.create({});
		if (!newDiagram) throw new Error('Failed to create diagram');

		const newFile = await File.create({
			user: userId,
			diagram: replaceMongoIdInObject(newDiagram).id,
		});

		if (!newFile) throw new Error('Failed to create file');

		revalidatePath('/jam');
		return replaceMongoIdInObject(newFile);
	} catch (error) {
		throw error;
	}
};

export const saveDiagram = async (
	diagramId: string,
	nodes: Node[],
	edges: Edge[],
) => {
	try {
		dbConnect();
		const diagram = await Diagram.findById(diagramId);
		if (!diagram) throw new Error('Diagram not found');

		diagram.nodes = nodes;
		diagram.edges = edges;
		await diagram.save();
	} catch (error) {
		throw error;
	}
};
