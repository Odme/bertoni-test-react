import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
display: block;
max-width: 1140px;
margin: 0 auto;
`;

const FormBlock = styled.div`
display: flex;
margin-top: 30px;
width: 50%;
flex-direction: column;
`;

const FormGroup = styled.div`
display: block;
margin: 10px 0;
`;

const fetchTask = () => {
  return axios.get(`http://localhost:8000/tasks`);
};

const fetchDeleteTask = ({ id }) => {
  return axios.post(`http://localhost:8000/deleteTask`, {
    id,
  });
};

const fetchCreateTask = ({ name, description, done }) => {
  return axios.post(`http://localhost:8000/createTask`, {
    name,
    description,
    done,
  });
};

const fetchEditTask = ({
  id,
  name,
  description,
  done,
}) => {
  return axios.post(`http://localhost:8000/editTask`, {
    id,
    name,
    description,
    done,
  });
};

const AppView = (props) => {
  const {
    editingTask,
    deleteTask,
    saveTask,
    saveTasks,
    setEditTask,
    tasks,
  } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false);

  const onChangeNameHandle = (event) => setName(event.target.value);
  const onChangeDescriptionHandle = (event) => setDescription(event.target.value);
  const onChangeDoneHandle = (event) => setDone(event.target.checked);

  const onClickDeleteHandle = (id) => {
    fetchDeleteTask({ id }).then((res) => {
      if (res.data.ok) {
        deleteTask(id);
      }
    });
  }

  const onClickEditHandle = (id) => {
    setEditTask(id);
    const foundTask = tasks.find((task) => task._id === id);
    setName(foundTask.name);
    setDescription(foundTask.description);
    setDone(foundTask.done);
  }

  const cleanForm = () => {
    setEditTask('');
    setName('')
    setDescription('');
    setDone(false);
  };

  const onSubmitForm = () => {
    if (name && description) {
      if (editingTask) {
        fetchEditTask({
          id: editingTask,
          name,
          description,
          done,
        }).then((res) => {
          if (res.data.ok) {
            saveTask({
              id: editingTask,
              name,
              description,
              done,
            });
            cleanForm();
          }
        });
      } else {
        fetchCreateTask({
          name,
          description,
          done,
        }).then((res) => {
          if (res.data.ok) {
            saveTask({
              _id: res.data.insertedId,
              name,
              description,
              done,
            });
            cleanForm();
          }
        });
      }
    }
  };

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
            <th width="25%">Status</th>
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
                <button onClick={() => onClickEditHandle(task._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormBlock>
        <FormGroup>
          <label>{'Name: '}</label>
          <input onChange={onChangeNameHandle} value={name} />
        </FormGroup>
        <FormGroup>
          <label>{'Description: '}</label>
          <input onChange={onChangeDescriptionHandle} value={description} />
        </FormGroup>
        <FormGroup>
          <input onChange={onChangeDoneHandle} type="checkbox" checked={done} /><span>Done</span>
        </FormGroup>
        <FormGroup>
          <button onClick={onSubmitForm}>{editingTask ? 'Edit' : 'Create'}</button>
        </FormGroup>
      </FormBlock>
    </Container>
  );
}

AppView.defaultProps = {
  editingTask: null,
  tasks: [],
};

AppView.propTypes = {
  editingTask: PropTypes.string,
  saveTask: PropTypes.func.isRequired,
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

export default AppView;
