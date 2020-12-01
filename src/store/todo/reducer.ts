import {
  TodoState,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TodoActionTypes,
} from './types';

const initialState: TodoState = {
  todos: [
    {
      id: '1',
      title: 'Read',
      description: 'read a book',
      completed: true,
    },
    {
      id: '2',
      title: 'Lunch',
      description: 'Buy a meal before lunch',
      completed: false,
    },
  ],
};

export function todoReducer(
  state = initialState,
  action: TodoActionTypes,
): TodoState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: state.todos.concat(action.payload),
      };

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...action.payload } : todo,
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
}
