import {combineReducers, createStore} from "redux";
import todoReducer from "./todo-reducer";
import {storage} from "../utils";

const reducers = combineReducers({
  todoReducer
});

const store = createStore(reducers);

store.subscribe(() => {
  storage.tasks.set(store.getState().todoReducer.todoData);
});

export default store;
