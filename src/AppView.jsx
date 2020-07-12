/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const AppView = (props) => {
  const {
    addEditTask,
    editingTask,
    deleteTask,
    setEditTask,
    tasks,
    getTasks,
  } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false);

  const onChangeNameHandle = (event) => setName(event.target.value);
  const onChangeDescriptionHandle = (event) => setDescription(event.target.value);
  const onChangeDoneHandle = (event) => setDone(event.target.checked);

  const onClickDeleteHandle = (id) => {
    deleteTask(id);
  };

  const onClickEditHandle = (id) => {
    setEditTask(id);
    const foundTask = tasks.find((task) => task._id === id);
    setName(foundTask.name);
    setDescription(foundTask.description);
    setDone(foundTask.done);
  };

  const cleanForm = () => {
    setEditTask('');
    setName('');
    setDescription('');
    setDone(false);
  };

  const formValid = name && description;

  const onSubmitForm = () => {
    addEditTask({
      id: editingTask,
      name,
      description,
      done,
    });
    cleanForm();
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

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
                <button type="button" onClick={() => onClickDeleteHandle(task._id)}>Delete</button>
                <button type="button" onClick={() => onClickEditHandle(task._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormBlock>
        <FormGroup>
          <label htmlFor="name">{'Name: '}</label>
          <input onChange={onChangeNameHandle} value={name} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="description">{'Description: '}</label>
          <input onChange={onChangeDescriptionHandle} value={description} />
        </FormGroup>
        <FormGroup>
          <input onChange={onChangeDoneHandle} type="checkbox" checked={Boolean(done)} />
          <span>Done</span>
        </FormGroup>
        <FormGroup>
          <button type="button" onClick={onSubmitForm} disabled={!formValid}>
            {editingTask ? 'Update' : 'Create'}
          </button>
        </FormGroup>
      </FormBlock>
    </Container>
  );
};

AppView.defaultProps = {
  editingTask: null,
  tasks: [],
};

AppView.propTypes = {
  addEditTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  editingTask: PropTypes.string,
  getTasks: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    done: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  })),
  setEditTask: PropTypes.func.isRequired,
};

export default AppView;
