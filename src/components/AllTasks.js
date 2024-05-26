import React , {useEffect, useState} from 'react'
import { Button, Table } from 'reactstrap';
import { allTasks, getTask , removeTask} from '../services/TaskService';
import { useNavigate, useParams } from 'react-router-dom';


const AllTasks = () => {


    const [tasks, setTasks] =useState([]);
    const [firstName, setTaskName] = useState("");
    const [status, setStatus] = useState("");
    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() =>{
       getAllTask();


    }, [])


    function getAllTask(){
        allTasks().then((response) =>{
            setTasks(response.data);
        }).catch(error => {
            console.error(error);
        })
    }



    function updateTask(id){
        navigator(`/update_task/${id}`);
    }

   function deleteTask(taskid){
        console.log(taskid);
        removeTask(taskid).then((response) =>{
            console.log("deleted");
            getAllTask();
        }).catch((error) =>{
            console.log(error);
        })
   }
    

   
  return (
    <div>
        <h2 className='text-center'>Tasks For the Day</h2>
        <Table hover >
            <thead>
                   <tr>
                    <th>Task Id</th>
                    <th>Task Name</th>
                    <th>Task Status</th>
                    <th></th>
                    </tr> 
            </thead>
            <tbody>
                    {
                        tasks.map(task =>
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.taskName}</td>
                                <td>{task.status}</td>
                                <td>
                                    <Button onClick={() => updateTask(task.id)}> Update</Button>
                                </td>
                                <td>
                                    <Button onClick={() => deleteTask(task.id)}> Delete</Button>
                                </td>
                            </tr>
                            )
                    }
            </tbody>
        </Table>
    </div>
  )
}

export default AllTasks;