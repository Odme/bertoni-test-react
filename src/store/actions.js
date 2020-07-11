export const SAVE_TASKS = 'SAVE_TASKS';
export const DELETE_TASK = 'DELETE_TASK';

export const saveTasks = ({ tasks }) => ({
  type: SAVE_TASKS,
  payload: { tasks },
});

export const deleteTask = ({ id }) => ({
  type: DELETE_TASK,
  payload: { id },
});
