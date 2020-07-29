import { v4 as uuidv4 } from "uuid";
import { storage } from "utils";
import {
  ADD_TASK,
  CHANGE_ALL_CHECKBOX,
  CHANGE_EDITABLE_TASK_ID,
  DELETE_COMPLETED_TASKS,
  DELETE_TASK,
  UPDATE_TASK
} from "./actionNames";

const getInitialState = () => ({
  todoData: storage.tasks.get(),
  editableTaskId: null
});

const todoReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ADD_TASK: {
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
    }

    case DELETE_TASK: {
      return {
        ...state,
        todoData: state.todoData.filter((item) => item.id !== action.data)
      };
    }

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

    case UPDATE_TASK: {
      return {
        ...state,
        todoData: state.todoData.map((item) => {
          if (item.id === action.data.id) {
            return {
              ...item,
              text: action.data.text,
              check: action.data.check
            };
          }
          return item;
        })
      };
    }

    case DELETE_COMPLETED_TASKS: {
      const leftTasks = state.todoData.filter((item) => item.check === false);
      storage.tasks.set(leftTasks);
      return {
        ...state,
        todoData: leftTasks
      };
    }

    case CHANGE_EDITABLE_TASK_ID:
      return {
        ...state,
        editableTaskId: action.data
      };

    default:
      return state;
  }
};

export default todoReducer;
