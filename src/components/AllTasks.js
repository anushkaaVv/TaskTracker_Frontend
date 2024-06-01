import React, { useEffect, useState } from 'react'
import { Button, Table } from 'reactstrap';
import { allTasks, removeTask } from '../backendFunctions/TaskService';
import { useNavigate } from 'react-router-dom';


const AllTasks = () => {


    const [tasks, setTasks] = useState([]);
    const navigator = useNavigate();


    useEffect(() => {
        document.title = "AllTasks";
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
        console.log(taskid);
        removeTask(taskid).then((response) => {
            console.log("deleted");
            getAllTask();
        }).catch((error) => {
            console.log(error);
        })
    }


    const currentDate = new Date().toISOString().split('T')[0];
    console.log(currentDate);
    console.log(typeof currentDate);


    return (
            <div className='tableBox' >

                <Table hover style={{ width: "70%" }}>
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Task Status</th>
                            <th>End_Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            tasks.map(task =>
                                <tr key={task.id}   className={task.date === currentDate ? 'highlight-row' : ''}>
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
                </Table>
            </div>
    )
}

export default AllTasks;