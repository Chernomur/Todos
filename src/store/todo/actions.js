import {
  UPDATE_TASK,
  ADD_TASK,
  CHANGE_ALL_CHECKBOX,
  DELETE_COMPLETED_TASKS,
  DELETE_TASK,
  CHANGE_INPUT_STATUS
} from "./actionNames";

export const addTask = (data) => ({
  type: ADD_TASK,
  data
});
export const deleteTask = (data) => ({
  type: DELETE_TASK,
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
export const changeInputStatus = (data) => ({
  type: CHANGE_INPUT_STATUS,
  data
});
