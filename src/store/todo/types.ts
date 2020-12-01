export interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TodoState {
  todos: TodoItem[];
}

export const CREATE_TODO = 'todo/CREATE_TODO';

interface CreateTodoAction {
  type: typeof CREATE_TODO;
  payload: TodoItem;
}

export const UPDATE_TODO = 'todo/UPDATE_TODO';

interface UpdateTodoAction {
  type: typeof UPDATE_TODO,
  payload: TodoItem;
}

export const DELETE_TODO = 'todo/DELETE_TODO';

interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: string;
}

export type TodoActionTypes = CreateTodoAction | UpdateTodoAction | DeleteTodoAction;
