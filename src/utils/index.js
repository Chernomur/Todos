import constants from "./constants";

export const storage = {
  tasks: {
    get: () => {
      try {
        const tasks = JSON.parse(localStorage.getItem(constants.TASKS_STORAGE_NAME));
        return tasks || [];
      } catch (error) {
        return [];
      }
    },
    set: (tasks) => {
      localStorage.setItem(constants.TASKS_STORAGE_NAME, JSON.stringify(tasks));
    }
  }
};
