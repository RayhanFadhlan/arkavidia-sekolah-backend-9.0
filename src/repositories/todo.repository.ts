import { and, eq } from 'drizzle-orm';
import type { z } from 'zod';
import type { PostTodoBodySchema, PutTodoBodySchema } from '~/types/todo.type';
import type { Database } from '../db/drizzle';
import { todo } from '../db/schema/todo.schema';

export const getTodoById = async (db: Database, id: string) => {
	return await db.select().from(todo).where(eq(todo.id, id));
};

export const getTodoList = async (
	db: Database,
	isCompleted?: boolean,
	userId?: string,
) => {
	const conditions = [];

	if (isCompleted !== undefined) {
		conditions.push(eq(todo.isCompleted, isCompleted));
	}

	if (userId) {
		conditions.push(eq(todo.authorId, userId));
	}

	return conditions.length > 0
		? await db
				.select()
				.from(todo)
				.where(and(...conditions))
		: await db.select().from(todo);
};

export const insertTodo = async (
	db: Database,
	body: z.infer<typeof PostTodoBodySchema>,
) => {
	return await db.insert(todo).values(body).returning();
};

export const updateTodoById = async (
	db: Database,
	id: string,
	body: z.infer<typeof PutTodoBodySchema>,
) => {
	return await db.update(todo).set(body).where(eq(todo.id, id)).returning();
};

export const deleteTodoById = async (db: Database, id: string) => {
	return await db.delete(todo).where(eq(todo.id, id));
};
