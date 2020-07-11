import { connect } from 'react-redux';

import {
  deleteTask,
  saveTask,
  saveTasks,
  setEditTask,
} from './store/actions';
import AppView from './AppView';

const mapStateToProps = (state) => ({
  tasks: state.tasks.tasks,
  editingTask: state.tasks.editingTask,
});

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (id) => dispatch(deleteTask({ id })),
  saveTask: (task) => dispatch(saveTask({ task })),
  saveTasks: (tasks) => dispatch(saveTasks({ tasks })),
  setEditTask: (id) => dispatch(setEditTask({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
