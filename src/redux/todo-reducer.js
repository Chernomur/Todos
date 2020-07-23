import {v4 as uuidv4} from "uuid";
import {storage} from "../utils";

const ADD_TASK = "ADD-TASK";
const DELETE_TASK = "DELETE-TASK";
const UPDATE_CHECKBOX = "UPDATE-CHECKBOX";
const UPDATE_TASK = "UPDATE-TASK";
const CHANGE_ALL_CHECKBOX = "CHANGE-ALL-CHECKBOX";
const DELETE_COMPLETED_TASKS = "DELETE-COMPLETED-TASKS";
const CHANGE_FILTER = "CHANGE-FILTER";
const SAVE_TASKS_TO_STORAGE = "SAVE-TASKS-TO-STORAGE";

const initialState = {
  todoData: storage.tasks.get(),
  filter: window.location.hash || "#all"
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        todoData: [...state.todoData,
          {
            id: uuidv4(),
            check: false,
            text: action.text
          }
        ]
      };
    case DELETE_TASK:
      // eslint-disable-next-line no-case-declarations
      const newTasks = state.todoData.filter((item) => item.id !== action.id);
      return {
        ...state,
        todoData: newTasks
      };
    case UPDATE_CHECKBOX:
      return {
        ...state,
        todoData: state.todoData.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              check: !item.check
            };
          }
          return item;
        })
      };
    case CHANGE_ALL_CHECKBOX:
      // eslint-disable-next-line no-case-declarations
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
    case UPDATE_TASK:
      return {
        ...state,
        todoData: state.todoData.map((item) => {
          if (item.id === action.id) {
            return {
              ...item,
              text: action.text
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
    case CHANGE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case SAVE_TASKS_TO_STORAGE:
      storage.tasks.set(state.todoData);
      break;
    default:
      return state;
  }
};

export default todoReducer;

export const addTask = (text) => ({type: ADD_TASK, text});
export const deleteTask = (id) => ({type: DELETE_TASK, id});
export const updateCheckbox = (id) => ({type: UPDATE_CHECKBOX, id});
export const updateTask = (id, text) => ({type: UPDATE_TASK, id, text});
export const changeAllCheckbox = () => ({type: CHANGE_ALL_CHECKBOX});
export const deleteCompletedTasks = () => ({type: DELETE_COMPLETED_TASKS});
export const changeFilter = (filter) => ({type: CHANGE_FILTER, filter});
