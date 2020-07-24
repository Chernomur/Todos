import {
  UPDATE_TASK,
  ADD_TASK,
  CHANGE_ALL_CHECKBOX,
  DELETE_COMPLETED_TASKS,
  DELETE_TASK,
  UPDATE_CHECKBOX
} from "./actionNames";

export const addTask = (data) => ({
  type: ADD_TASK,
  data
});
export const deleteTask = (data) => ({
  type: DELETE_TASK,
  data
});
export const updateCheckbox = (data) => ({
  type: UPDATE_CHECKBOX,
  data
});
export const updateTask = (data) => ({
  type: UPDATE_TASK,
  data
});
export const changeAllCheckbox = () => ({
  type: CHANGE_ALL_CHECKBOX
});
export const deleteCompletedTasks = () => ({
  type: DELETE_COMPLETED_TASKS
});
