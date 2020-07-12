/* eslint-disable no-underscore-dangle */
import {
  SAVE_TASKS,
  REMOVE_TASK,
  SET_EDIT_TASK,
  SAVE_TASK,
} from './actions';

const initialState = () => ({
  tasks: [],
  editingTask: null,
});

const reducer = (state = initialState(), action) => {
  const { payload, type } = action;
  switch (type) {
    case SAVE_TASKS:
      return {
        ...state,
        tasks: payload.tasks,
      };
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload.id),
      };
    case SET_EDIT_TASK:
      return {
        ...state,
        editingTask: payload.id,
      };
    case SAVE_TASK: {
      const { task } = payload;
      let tasks = [...state.tasks];
      const foundIndex = tasks.findIndex((item) => item._id === task._id);
      if (foundIndex !== -1) {
        tasks[foundIndex] = { ...tasks[foundIndex], ...task };
      } else {
        tasks = [...tasks, task];
      }
      return {
        ...state,
        tasks,
      };
    }
    default:
      break;
  }
  return state;
};

export default reducer;
