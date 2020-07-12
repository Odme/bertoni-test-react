import axios from 'axios';

const fetchTask = () => axios.get('http://localhost:8000/tasks').then((response) => response.data);

const fetchDeleteTask = ({ id }) => axios.post('http://localhost:8000/deleteTask', {
  id,
}).then((response) => response.data);

const fetchCreateTask = ({ name, description, done }) => (
  axios.post('http://localhost:8000/createTask', {
    name,
    description,
    done,
  }).then((response) => response.data)
);

const fetchEditTask = ({
  id,
  name,
  description,
  done,
}) => axios.post('http://localhost:8000/editTask', {
  id,
  name,
  description,
  done,
}).then((response) => response.data);

export default {
  fetchCreateTask,
  fetchDeleteTask,
  fetchEditTask,
  fetchTask,
};
