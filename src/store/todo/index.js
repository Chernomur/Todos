import { v4 as uuidv4 } from "uuid";
import { storage } from "utils";
import {
  ADD_TASK,
  CHANGE_ALL_CHECKBOX, CHANGE_INPUT_STATUS,
  DELETE_COMPLETED_TASKS,
  DELETE_TASK,
  UPDATE_TASK
} from "./actionNames";

const getInitialState = () => ({
  todoData: storage.tasks.get(),
  // =============================================
  editableTaskId: null
  // =============================================
});

const todoReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case ADD_TASK: {
      const todoData = [
        ...state.todoData, {
          id: uuidv4(),
          check: false,
          text: action.data
        }
      ];

      storage.tasks.set(todoData);

      return {
        ...state,
        todoData,
        input: null
      };
    }

    case DELETE_TASK: {
      const newTasks = state.todoData.filter((item) => item.id !== action.data);

      storage.tasks.set(newTasks);

      return {
        ...state,
        todoData: newTasks
      };
    }

    case CHANGE_ALL_CHECKBOX: {
      const isActive = Boolean(
        state.todoData.find((item) => (item.check === false))
      );

      const todoData = state.todoData.map((item) => ({
        ...item,
        check: isActive
      }));

      storage.tasks.set(todoData);

      return {
        ...state,
        todoData
      };
    }

    case UPDATE_TASK: {
      const todoData = state.todoData.map((item) => {
        if (item.id === action.data.id) {
          return {
            ...item,
            text: action.data.text,
            check: action.data.check
          };
        }
        return item;
      });

      storage.tasks.set(todoData);

      return {
        ...state,
        todoData
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

    case CHANGE_INPUT_STATUS:
      return {
        ...state,
        input: action.data
      };

    default:
      return state;
  }
};

export default todoReducer;
