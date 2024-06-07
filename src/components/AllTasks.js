import React, { useEffect, useState } from 'react'
import { Button, Table } from 'reactstrap';
import { allTasks, removeTask } from '../backendFunctions/TaskService';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';


const AllTasks = () => {


    const [tasks, setTasks] = useState([]);
    const navigator = useNavigate();


    useEffect(() => {
        document.title = "AllTasks";
        const currentDate = new Date().toISOString().split('T')[0];
        getAllTask();
    }, [])


    function getAllTask() {
        allTasks().then((response) => {
        const sortedTasks = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setTasks(sortedTasks);
        }).catch(error => {
            console.error(error);
        })
    }


    function updateTask(id) {
        navigator(`/update_task/${id}`);
    }



    function deleteTask(taskid) {
        removeTask(taskid).then((response) => {
            toast("task Deleted succesfully")
            getAllTask();
            
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
            <div className='tableBox' >
                {tasks.length > 0 ? (
               
                    <Table hover >
                        <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Task Status</th>
                                <th>Task End Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                tasks.map(task =>
                                    <tr key={task.id} >
                                        <td>{task.taskName}</td>
                                        <td>{task.status}</td>
                                        <td>{task.date}</td>
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
                    </Table>):( 
                        <p className='noTask'>No Tasks to display</p>
                    )}
                
            </div>
    )
}

export default AllTasks;