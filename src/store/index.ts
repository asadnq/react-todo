import { createStore, combineReducers } from 'redux';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

import { todoReducer } from './todo/reducer';

const rootReducer = combineReducers({
  todo: todoReducer,
});

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000),
);

export default store;

export type RootState = ReturnType<typeof rootReducer>;
