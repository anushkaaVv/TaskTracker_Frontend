import React, { useEffect, useState } from 'react'
import { Button, Table,Input } from 'reactstrap';
import { allTasks, removeTask } from '../backendFunctions/TaskService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const AllTasks = () => {

    const [tasks, setTasks] = useState([]);
    const [query,setQuery] =useState("");
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
        removeTask(taskid).then((response) => {
            toast("task Deleted succesfully")
            getAllTask();

        }).catch((error) => {
            console.log(error);
        })
    }

    function getFilteredItems(query, tasks){
        if(!query){
            return tasks;
        }
        return tasks.filter(t => t.taskName.toLowerCase().includes(query.toLowerCase()));
    }


    const filtered = getFilteredItems(query,tasks);
    const currentDate = new Date().toISOString().split('T')[0];


    return (
        <div>

            <div className='searchBar'>
                <Input type="text" placeholder='Search By Task Name' onChange={e=> setQuery(e.target.value)} />
            </div>

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
                                query ===""?(
                                tasks.map(task =>
                                    <tr key={task.id} className={task.date === currentDate ? 'highlight-row' : ''} >
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
                                ):
                                (
                                    filtered.length>0?(
                                    
                                    filtered.map(t=>
                                        <tr key={t.id} className={t.date === currentDate ? 'highlight-row' : ''} >
                                        <td>{t.taskName}</td>
                                        <td>{t.status}</td>
                                        <td>{t.date}</td>
                                        <td>
                                            <Button className='allBtn updatebtn' onClick={() => updateTask(t.id)}  > Update</Button>
                                        </td>
                                        <td>
                                            <Button className='allBtn deletebtn' onClick={() => deleteTask(t.id)}  > Delete</Button>
                                        </td>
                                
                                        </tr>
                                        
                                    )):(<p className=' fillTask'>Oops! No Such Task </p>)
                                )
                            }
                        </tbody>
                    </Table>) : (
                    <p className='noTask'>No Tasks to display</p>
                )}

            </div>
        </div>
    )
}

export default AllTasks;