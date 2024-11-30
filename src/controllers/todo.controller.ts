import { db } from '../db/drizzle';
import {
	deleteTodoById,
	getTodoById,
	getTodoList,
	insertTodo,
	updateTodoById,
} from '../repositories/todo.repository';
import {
	deleteTodoRoute,
	getListTodoRoute,
	getTodoRoute,
	postTodoRoute,
	putTodoRoute,
} from '../routes/todo.route';
import { createRouter } from '../utils/router-factory';

export const todoRouter = createRouter();

todoRouter.openapi(getTodoRoute, async (c) => {
	const { id } = c.req.valid('param');
	const todo = await getTodoById(db, id);
	return c.json(todo, 200);
});

todoRouter.openapi(getListTodoRoute, async (c) => {
	const { isCompleted, userId } = c.req.valid('query');
	const todo = await getTodoList(db, isCompleted, userId);
	return c.json(todo, 200);
});

todoRouter.openapi(postTodoRoute, async (c) => {
	const body = c.req.valid('json');
	const todo = await insertTodo(db, body);
	return c.json(todo, 200);
});

todoRouter.openapi(putTodoRoute, async (c) => {
	const { id } = c.req.valid('param');
	const body = c.req.valid('json');
	const todo = await updateTodoById(db, id, body);
	return c.json(todo, 200);
});

todoRouter.openapi(deleteTodoRoute, async (c) => {
	const { id } = c.req.valid('param');
	const todo = await deleteTodoById(db, id);
	return c.json(todo, 200);
});
