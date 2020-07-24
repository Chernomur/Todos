import { v4 as uuidv4 } from "uuid";
import { storage } from "../../utils";
import {
  ADD_TASK,
  CHANGE_ALL_CHECKBOX,
  DELETE_COMPLETED_TASKS,
  DELETE_TASK,
  UPDATE_CHECKBOX,
  UPDATE_TASK
} from "./actionNames";

const getInitialState = () => ({
  todoData: storage.tasks.get()
});

const todoReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        todoData: [
          ...state.todoData, {
            id: uuidv4(),
            check: false,
            text: action.data
          }
        ]
      };

    case DELETE_TASK: {
      const newTasks = state.todoData.filter((item) => item.id !== action.data);
      return {
        ...state,
        todoData: newTasks
      };
    }

    case UPDATE_CHECKBOX:
      return {
        ...state,
        todoData: state.todoData.map((item) => {
          if (item.id === action.data) {
            return {
              ...item,
              check: !item.check
            };
          }
          return item;
        })
      };

    case CHANGE_ALL_CHECKBOX: {
      const isActive = Boolean(
        state.todoData.find((item) => (item.check === false))
      );
      return {
        ...state,
        todoData: state.todoData.map((item) => ({
          ...item,
          check: isActive
        }))
      };
    }

    case UPDATE_TASK:
      return {
        ...state,
        todoData: state.todoData.map((item) => {
          if (item.id === action.data.id) {
            return {
              ...item,
              text: action.data.text
            };
          }
          return item;
        })
      };

    case DELETE_COMPLETED_TASKS:
      return {
        ...state,
        todoData: state.todoData.filter((item) => item.check === false)
      };

    default:
      return state;
  }
};

export default todoReducer;
