const TASKS_STORAGE_NAME = 'tasks';

export const storage = {
  tasks: {
    get: () => {
      try {
        const tasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_NAME));
        return tasks || [];
      } catch (error) {
        return [];
      }
    },
    set: (tasks) => {
      localStorage.setItem(TASKS_STORAGE_NAME, JSON.stringify(tasks));
    }
  }
};
