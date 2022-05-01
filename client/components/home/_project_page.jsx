import { useContext, useEffect, useState } from 'react';
import { ApiContext } from '../../utils/api_context';
import { Header } from '../common/header';
import { Button } from '../common/button';
import { useNavigate } from 'react-router';
import { Task } from '../common/task';
import { ConsoleLogger } from '@nestjs/common';

export const ProjectPage = () => {
  const api = useContext(ApiContext);
  var incompleteProjectTasks = [];
  var completeProjectTasks = [];
  var myProjectTasks = [];
  var unassignedProjectTasks = [];
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState(null);
  const [project, setProjects] = useState(null);
  const [user, setUser] = useState(null);
  const projectID = parseInt(sessionStorage.getItem("projectID"));
  const projectName = sessionStorage.getItem("selectedProject");

  useEffect(async () => {
    const res = await api.get('/users/me');
    setUser(res.user);
    setLoading(false);
  }, []);

  //get tasks
  useEffect(async () => {
    const res = await api.get('/tasks');
    setTasks(res.tasks);
  }, []);


  const navigate = useNavigate();

  const goToDashboard = () => {
    sessionStorage.setItem("projectID", "-1");
    sessionStorage.setItem("selectedProject", "None");
    navigate('/');
  };

//navigate to new task
  const goToNewTaskPage = () =>{
    navigate('/newTask')
  }

  const endProject = () =>{
    let id = projectID
    fetch('/endProj', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          id
      })
    })
    sessionStorage.setItem("projectID", "-1");
    sessionStorage.setItem("selectedProject", "None");
    navigate('/');
  }


  //Creates list of all tasks for the project
  const getTasks = () => {
    incompleteProjectTasks = [];
    completeProjectTasks = [];
    unassignedProjectTasks =[];
    myProjectTasks =[];
    let itasksObj = {};
    let ctasksObj = {};
    let mtasksObj = {};
    let utasksObj = {};

    for(const task in tasks){
      let currentTask = tasks[task];
      let taskID = currentTask.id;
      if((currentTask.projectID == projectID)){
        //console.log(currentTask.status);
        if(currentTask.status){
          ctasksObj[taskID] = currentTask;
        }else{
          if(currentTask.assignee == user.email){
            mtasksObj[taskID] = currentTask;
          }else if(currentTask.assignee == ""){
            utasksObj[taskID] = currentTask;
          }else{
            itasksObj[taskID] = currentTask;
          }
        }
      }
    }
    incompleteProjectTasks = Object.assign(incompleteProjectTasks,itasksObj)
    completeProjectTasks = Object.assign(completeProjectTasks,ctasksObj)
    myProjectTasks = Object.assign(myProjectTasks,mtasksObj)
    unassignedProjectTasks = Object.assign(unassignedProjectTasks,utasksObj)
  };
 
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dashboard'>
      <div className='page'>
      <Header text={projectName}></Header>
      <div className='pageBody'>
        <Button className="return" type="button" onClick={goToDashboard}> Return To Event Dashboard </Button>
        <Button className="add" type="button" onClick={goToNewTaskPage}>Add Job</Button>
        <div className='taskList'>{getTasks()}
          <div className='myTasks'>  <h5 className='taskCategory'>My To Do:</h5>
                {myProjectTasks.map((task) => {
                    return <Task title = {task.title} description={task.description} time={task.timeEstimation} status={task.status} projectID={task.projectID} id={task.id} assignee={task.assignee} user={user}></Task>
                  })}
          </div>
          <div className='undoneTasks'>  <h5 className='taskCategory'>Unassigned Jobs</h5>
                {unassignedProjectTasks.map((task) => {
                    return <Task title = {task.title} description={task.description} time={task.timeEstimation} status={task.status} projectID={task.projectID} id={task.id} assignee={task.assignee} user={user}></Task>
                  })}
          </div>
          <div className='incompleteTask'> <h5 className='taskCategory'>Assigned Jobs:</h5>
              {incompleteProjectTasks.map((task) => {
                  return <Task title = {task.title} description={task.description} time={task.timeEstimation} status={task.status}projectID={task.projectID} id={task.id} assignee={task.assignee} user={user}></Task>
                })}
          </div>
          <div className='completeTask'>  <h5 className='taskCategory'>Completed Jobs:</h5>
              {completeProjectTasks.map((task) => {
                  return <Task title = {task.title} description={task.description} time={task.timeEstimation} status={task.status} projectID={task.projectID} id={task.id} assignee={task.assignee} user={user}></Task>
                })}
          </div>
        </div>
      </div>
      </div>
      <footer>
        <p>Created by Melissa Ivie</p>
        <p>Modern Web Development Spring 2022</p>
      </footer>
    </div>
    
  );
};
