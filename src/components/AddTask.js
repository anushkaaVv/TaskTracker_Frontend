import React, { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Button, Input, FormFeedback } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { addTask, updatedTask, getTask } from '../backendFunctions/TaskService';
import { toast } from 'react-toastify';

function AddTask() {

    useEffect(() => {
        document.title = "Add/Update";

    }, [])

    const [taskName, setTaskName] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    const [errors, setErrors] = useState({
        taskName: '',
        status: '',
        date: ''
    });
   

    const navigator = useNavigate();


    function handleForm(e) {
        e.preventDefault();
        const task = { taskName, status, date };


        const founderrors = {};

        if (taskName === '') {
            founderrors.taskName = 'Task name is required';

        }

        if (status === '') {
            founderrors.status = 'Status is required';

        }

        if (date ==='') {
            founderrors.date = 'date is required';
        }


        if (Object.keys(founderrors).length) {
            setErrors(founderrors);
            return;

        }


        if(id){
                updatedTask(id, task).then((response) => {

                    navigator("/view_tasks");
                    toast("task updated succesfully")

                }).catch((error) => {
                    console.log(error);

                })
            } else {
                addTask(task).then((response) => {

                    navigator("/view_tasks");
                    toast("task added succesfully")
                }).catch((error) => {
                    console.log(error);
                })
        }



    };


    const { id } = useParams();
    useEffect(() => {
        console.log(id);
        if (id) {
            getTask(id).then(
                (response) => {
                    setTaskName(response.data.taskName);
                    setStatus(response.data.status);
                }
            ).catch(error => {
                console.error(error);
            })
        }
    }, [id])



    return (
        <div className='carddiv' >
            <div className="cardd" >
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
                                onChange={(event) => { setTaskName(event.target.value) }}
                                invalid={errors.taskName !== ''}

                            />
                            {errors.taskName && (
                                <FormFeedback>{errors.taskName}</FormFeedback>
                            )}

                        </FormGroup>

                        <FormGroup>
                            <Label for="status">
                                Status
                            </Label>
                            <Input
                                type="select"
                                placeholder="Enter your status"
                                id="status"
                                value={status}
                                onChange={(event) => { setStatus(event.target.value) }}
                                invalid={errors.status !== ''}
                                autoComplete='off'
                            >
                                <option >
                                    not selected
                                </option>

                                <option value="pending ">
                                    Pending
                                </option>

                                <option value="done">
                                    Done
                                </option>
                            </Input>

                            {errors.status && (
                                <FormFeedback>{errors.status}</FormFeedback>
                            )}
                        </FormGroup>


                        <FormGroup>
                            <Label for="date">
                                Status
                            </Label>
                            <Input
                                type="date"
                                placeholder="Enter your Date"
                                id="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                invalid={errors.date !== ''}
                            />

                            {errors.date && (
                                <FormFeedback>{errors.date}</FormFeedback>
                            )}
                        </FormGroup>

                        <Button type="submit" className='btn btn1' > Add</Button>
                        <Button type="reset" className='btn btn2 ' onClick={(e) => {
                            setTaskName(" ");
                            setStatus(" ")
                        }}>Clear</Button>
                    </div>

                </Form>

            </div>
        </div>
    )
}

export default AddTask;