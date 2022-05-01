import { Button } from '../common/button';


export const Task = (props) => {
    
    var id = props.id;
    var user = props.user; 
    var assignee = user.email
    var taskAssignee = props.assignee;
    console.log("assignee:")
    console.log(assignee)
    var status = props.status;

    var changeTaskStatus = async () => {
        console.log(status)
        if(status == false){
            status = true; 
        }
        fetch('/updateTask', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                status, 
            })
        })

        window.location.reload(false);
    };

    var assignTask = async () => {
        sessionStorage.setItem("refreshProject", "T")
        fetch('/assignTask', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                assignee, 
            })
        })

        window.location.reload(false);
    };

    if(status == false){
        if(user.email == taskAssignee){
            return (
                <div className="unassignedTask">
                    <h5 className='taskTitle'>{props.title}</h5>
                    <p>Description: {props.description}</p>
                    <p>Assigned User: {taskAssignee}</p>
                    <Button type="button" onClick={changeTaskStatus}>
                      Mark as Done
                    </Button>
                </div>
            );
        }else if(taskAssignee == ""){
            return (
                <div className="task">
                    <h5 className='taskTitle'>{props.title}</h5>
                    <p>Description: {props.description}</p>
                    <p>Assigned User: {taskAssignee}</p>
                    <Button type="button" onClick={assignTask}>
                      Assign to Me
                    </Button>
                </div>
            );
        }else{
            return (
                <div className="assignedTask">
                    <h5 className='taskTitle'>{props.title}</h5>
                    <p>Description: {props.description}</p>
                    <p>Assigned User: {taskAssignee}</p>
                </div>
            );
        }

    }else{
        return (
        <div className="assignedTask">
            <h5 className='taskTitle'>{props.title}</h5>
            <p>Description: {props.description}</p>
            <p>Estimated Time: {props.time}</p>
            <p>Assigned User: {assignee}</p>
        </div>
        );
    }
  };