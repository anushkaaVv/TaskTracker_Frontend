import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Button, Input, Card, CardBody, CardTitle } from 'reactstrap'
import { addTask, updatedTask } from '../services/TaskService';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask } from '../services/TaskService';

function AddTask() {

    const [taskName, setTaskName] = useState('');
    const [status, setStatus] = useState('');
    const navigator = useNavigate();


    function handleTaskName(e) {
        setTaskName(e.target.value)
    }
    function handleStatus(e) {
        setStatus(e.target.value)
    }

    const [task, setTasks] =useState([]);

    function handleForm(e) {
        const task = { taskName, status }
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
                console.log(response.data)
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
        <div >
            <Card style={{ margin: "10px" }}>
                <CardBody>

                    <CardTitle style={{background:"#1679AB", color:"white" }}> <h1 className='text-center'>ADD/UPDATE </h1></CardTitle>

                    <Form onSubmit={handleForm}>
                        <FormGroup>
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
                            />
                        </FormGroup>
                        <Button type="submit" > Add</Button>
                        <Button type="reset" onClick={(e) => {
            setTaskName(" ");
            setStatus(" ")
        }}>Clear</Button>

                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddTask