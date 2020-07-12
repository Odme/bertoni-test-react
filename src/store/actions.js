import apiTask from '../api/task';

export const SAVE_TASKS = 'SAVE_TASKS';
export const REMOVE_TASK = 'REMOVE_TASK';
export const SET_EDIT_TASK = 'SET_EDIT_TASK';
export const SAVE_TASK = 'SAVE_TASK';

export const saveTasks = ({ tasks }) => ({
  type: SAVE_TASKS,
  payload: { tasks },
});

export const removeTask = ({ id }) => ({
  type: REMOVE_TASK,
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

export const getTasks = () => (dispatch) => (
  apiTask.fetchTask().then((data) => {
    dispatch(saveTasks({ tasks: data }));
  })
);

export const deleteTask = ({ id }) => (dispatch) => (
  apiTask.fetchDeleteTask({ id }).then((data) => {
    if (data.ok) {
      dispatch(removeTask({ id }));
    }
  })
);

export const addEditTask = ({ name, description, done }) => (dispatch, getState) => {
  const editId = getState().tasks.editingTask;
  return (editId ? apiTask.fetchEditTask : apiTask.fetchCreateTask)({
    id: editId,
    name,
    description,
    done,
  }).then((data) => {
    if (data.ok) {
      const task = {
        _id: editId || data.insertedId,
        name,
        description,
        done,
      };
      dispatch(saveTask({ task }));
    }
  });
};
