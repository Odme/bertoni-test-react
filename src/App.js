import { connect } from 'react-redux';

import {
  addEditTask,
  deleteTask,
  saveTasks,
  setEditTask,
  getTasks,
} from './store/actions';
import AppView from './AppView';

const mapStateToProps = (state) => ({
  tasks: state.tasks.tasks,
  editingTask: state.tasks.editingTask,
});

const mapDispatchToProps = (dispatch) => ({
  addEditTask: (task) => dispatch(addEditTask(task)),
  deleteTask: (id) => dispatch(deleteTask({ id })),
  getTasks: () => dispatch(getTasks()),
  saveTasks: (tasks) => dispatch(saveTasks({ tasks })),
  setEditTask: (id) => dispatch(setEditTask({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
