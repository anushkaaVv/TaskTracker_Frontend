import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Button, Input, Card, CardBody, CardTitle } from 'reactstrap'
import { addTask, updatedTask } from '../services/TaskService';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask } from '../services/TaskService';

function AddTask() {

    useEffect(() =>{
        document.title = "Add/Update";

    }, [])

    const [taskName, setTaskName] = useState('');
    const [status, setStatus] = useState('');
   
    const navigator = useNavigate();


    function handleTaskName(e) {
        setTaskName(e.target.value)
    }
    function handleStatus(e) {
        setStatus(e.target.value)
    }
    

    const [task, setTasks] = useState([]);

    function handleForm(e) {
        const task = { taskName, status}
        console.log(task);
        if (id) {
            updatedTask(id, task).then((response) => {
                console.log(response.data);
                navigator("/view_tasks");
            }).catch((error) => {
                console.log(error);
            })
        } else {

            addTask(task).then((response) => {
                // console.log(response.data)
                navigator("/view_tasks");
            }).catch((error) => {
                console.log(error);
            })

        }

        e.preventDefault();
    };


    const { id } = useParams();
    useEffect(() => {
        console.log(id);
        if (id) {
            getTask(id).then(
                (response) => {
                    console.log(response.data);
                    setTaskName(response.data.taskName);
                    setStatus(response.data.status);

                }
            ).catch(error => {
                console.error(error);
            })
        }
    }, [id])



    return (
        <div className='carddiv' style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
            <div className="card" style={{ marginTop: "35px", width: "70%", border:"0" }}>
                <h2 className='addHead' >ADD/UPDATE </h2>
               

                    

                    <Form onSubmit={handleForm}>
                        <div style={{ margin: "14px" }}>
                            <FormGroup >
                                <Label for="title">
                                    Enter Task
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Enter your task"
                                    id="title"
                                    value={taskName}
                                    onChange={handleTaskName}

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="status">
                                    Status
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Enter your status"
                                    id="status"
                                    value={status}
                                    onChange={handleStatus}
                                    autoComplete='off'
                                />
                            </FormGroup>


                            {/* <FormGroup>
                                <Label for="cal">
                                    Status
                                </Label>
                                <Input
                                    type="date"
                                    placeholder="Enter your status"
                                    id="cal"
                                    value={cal}
                                    onChange={handleCal}
                                    autoComplete='off'
                                />
                            </FormGroup> */}


                            <Button type="submit" className='btn btn1' > Add</Button>
                            <Button type="reset" className='btn btn2 '  onClick={(e) => {
                                setTaskName(" ");
                                setStatus(" ")
                            }}>Clear</Button>
                        </div>

                    </Form>
                
            </div>
        </div>
    )
}

export default AddTask