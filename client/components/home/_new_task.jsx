import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ApiContext } from '../../utils/api_context';
import { Paper } from '../common/paper';
import { Input } from '../common/input';
import { Button } from '../common/button';

export const NewTask = () => {
  const api = useContext(ApiContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [assignee, setAssignee] = useState('');
  const [project, setProject] = useState('');
  const [timeEstimation, setTimeEstimation] = useState('');
  const [status, setStatus] = useState('false');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(null);
  var projectID = parseInt(sessionStorage.getItem("projectID"));
  var projectLeader = sessionStorage.getItem("projectLeader");
  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);
  useEffect(async () => {
    const res = await api.get('/projects');
    setProjects(res.projects);
  }, []);


  const newTask = async () => {
    let assignee = ""
    let timeEstimation = ""

    if (title === '') {
      setErrorMessage('Task Title cannot be blank');
      return;
    } else if (description === '') {
      setErrorMessage('Task Description cannot be blank');
      return;
    } 

    fetch('/task', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        assignedUser,
        timeEstimation,
        projectID,
        status,
        assignee,
      })
    })
    navigate('/projectPage');
    window.location.reload(false);
  };

  const cancelAdd = async () => {
    navigate('/projectPage');
  };


  return (
    <div className="flex flex-row justify-center m-4">
      <div className="w-96">
        <Paper>
          <div>Job Title</div>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div>Job Description</div>
          <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div>Mark as complete?</div>
          <select name="completed" id="completed" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
          <div className="flex flex-row justify-end mt-2">
            <Button type="button" onClick={newTask}>
              Add New Job
            </Button>
            <Button type="button" onClick={cancelAdd}>
              Cancel
            </Button>
          </div>
          <div className="flex">{errorMessage}</div>
        </Paper>
      </div>
    </div>
  );
};
