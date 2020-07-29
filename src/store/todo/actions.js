import {
  UPDATE_TASK,
  ADD_TASK,
  CHANGE_ALL_CHECKBOX,
  DELETE_COMPLETED_TASKS,
  DELETE_TASK,
  CHANGE_EDITABLE_TASK_ID
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
export const changeEditableTaskId = (data) => ({
  type: CHANGE_EDITABLE_TASK_ID,
  data
});
