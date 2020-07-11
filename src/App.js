import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';

import { deleteTask, saveTasks } from './store/actions';

const Container = styled.div`
  display: block;
  max-width: 1140px;
  margin: 0 auto;
`;

const fetchTask = () => {
  return axios.get(`http://localhost:8000/tasks`);
};

const fetchDeleteTask = ({ id }) => {
  return axios.post(`http://localhost:8000/deleteTask`, {
    id,
  });
};

const App = (props) => {
  const { deleteTask, saveTasks, tasks } = props;

  const onClickDeleteHandle = (id) => {
    console.log(id);
    fetchDeleteTask({ id }).then((res) => {
      if (res.data.ok) {
        console.log(res);
        deleteTask(id);
      }
    });
  }

  useEffect(() => {
    fetchTask().then((res) => saveTasks(res.data));
  }, [saveTasks]);

  return (
    <Container>
      <table width="100%">
        <thead>
          <tr>
            <th width="25%">Name</th>
            <th width="25%">Description</th>
            <th width="25%">State</th>
            <th width="25%">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td width="25%">{task.name}</td>
              <td width="25%">{task.description}</td>
              <td width="25%">{task.done ? 'Done' : 'Not ready'}</td>
              <td width="25%">
                <button onClick={() => onClickDeleteHandle(task._id)}>Delete</button>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

App.defaultProps = {
  tasks: [],
};

App.propTypes = {
  saveTasks: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    done: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  })),
};

const mapStateToProps = (state) => ({
  tasks: state.tasks.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (id) => dispatch(deleteTask({ id })),
  saveTasks: (tasks) => dispatch(saveTasks({ tasks })),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
