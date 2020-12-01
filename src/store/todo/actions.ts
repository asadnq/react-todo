import {
  TodoItem,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TodoActionTypes,
} from './types';

export function createTodo(newTodo: TodoItem): TodoActionTypes {
  return {
    type: CREATE_TODO,
    payload: newTodo,
  };
}

export function updateTodo(updatedTodo: TodoItem): TodoActionTypes {
  return {
    type: UPDATE_TODO,
    payload: updatedTodo,
  };
}

export function deleteTodo(id: string): TodoActionTypes {
  return {
    type: DELETE_TODO,
    payload: id,
  };
}
