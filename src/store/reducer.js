import { SAVE_TASKS, DELETE_TASK } from './actions';

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
      }
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload.id),
      }
    default:
      break;
  }
  return state;
};

export default reducer;