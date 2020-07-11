export const SAVE_TASKS = 'SAVE_TASKS';
export const DELETE_TASK = 'DELETE_TASK';
export const SET_EDIT_TASK = 'SET_EDIT_TASK';
export const SAVE_TASK = 'SAVE_TASK';

export const saveTasks = ({ tasks }) => ({
  type: SAVE_TASKS,
  payload: { tasks },
});

export const deleteTask = ({ id }) => ({
  type: DELETE_TASK,
  payload: { id },
});

export const setEditTask = ({ id }) => ({
  type: SET_EDIT_TASK,
  payload: { id },
});


export const saveTask = ({ task }) => ({
  type: SAVE_TASK,
  payload: { task },
});
