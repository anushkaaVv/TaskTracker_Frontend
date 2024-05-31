import React , {useEffect, useState} from 'react'
import { Button, Table } from 'reactstrap';
import { allTasks, removeTask} from '../services/TaskService';
import { useNavigate} from 'react-router-dom';


const AllTasks = () => {


    const [tasks, setTasks] =useState([]);
    const navigator = useNavigate();
   

    useEffect(() =>{
        document.title = "AllTasks";
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
        <h2 className='allHeading' >Tasks For the Day</h2>
    <div className='tableBox' >
        
        <Table hover style={{width:"70%"}}>
            <thead>
                   <tr>
                    <th>Task Id</th>
                    <th>Task Name</th>
                    {/* <th>End_Date</th> */}
                    <th>Task Status</th>
                    <th></th>
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
                                    <Button className='allBtn updatebtn' onClick={() => updateTask(task.id)}  > Update</Button>
                                </td>
                                <td>
                                
                                    <Button className='allBtn deletebtn' onClick={() => deleteTask(task.id)}  > Delete</Button>
                                </td>
                            </tr>
                            )
                    }
            </tbody>
        </Table>
        </div>    
    </div>
  )
}

export default AllTasks;