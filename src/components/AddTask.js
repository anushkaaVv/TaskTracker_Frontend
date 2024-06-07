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

    const { id } = useParams();
    function handleForm(e) {
        e.preventDefault();
        const tasks = { taskName, status, date };
        const founderrors = {};

        if (taskName === '') {
            founderrors.taskName = 'Task name is required with character >=2 and <=30';

        }else {
            founderrors.taskName ='';
          }

        if (status === '') {
            founderrors.status = 'Status is required';

        }else {
            founderrors.status ='';
          }

        if (date ==='') {
            founderrors.date = 'date is required';
        }
        else {
            founderrors.date ='';
          }

        if (founderrors.taskName !=='' || founderrors.status !== ''|| founderrors.date !== ''){
            setErrors(founderrors);
            return;

        }

        
        if(id){
                updatedTask(id, tasks).then((response) => {
                    navigator("/view_tasks");
                    toast("task updated succesfully")

                }).catch((error) => {
                    console.log(error);
                })
            } else {
                addTask(tasks).then((response) => {
                    navigator("/view_tasks");
                    toast.success("task added succesfully")
                }).catch((error) => {
                    console.log(error);
                })
        }

    };

    
    useEffect(() => {
        if (id) {
            getTask(id).then(
                (response) => {
                    setTaskName(response.data.taskName);
                    setStatus(response.data.status);
                    setDate(response.data.date);
                }
            ).catch(error => {
                console.error(error);
            })
        }
    }, [id])


const buttonText = id ? 'Update':'Add';
const currentDate = new Date().toISOString().split('T')[0];



    return (
        <div className='carddiv' >
            <div className="cardd" >
                <h2 className='addHead' >{buttonText} </h2>
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
                                onChange={(event)=>{setTaskName(event.target.value)}}
                                invalid={errors.taskName !== ''}
                                minLength={3}
                                maxLength={30}
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
                                onChange={(event)=>{
                                    setStatus(event.target.value)}}
                                invalid={errors.status !== ''}
                                autoComplete='off'
                            >
                                <option >
                                    not selected
                                </option>

                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Done">
                                    Done
                                </option>
                            </Input>

                            {errors.status && (
                                <FormFeedback>{errors.status}</FormFeedback>
                            )}
                        </FormGroup>


                        <FormGroup>
                            <Label for="date">
                                Task End Date
                            </Label>
                            <Input
                                type="date"
                                placeholder="Enter your Date"
                                id="date"
                                value={date}
                                onChange={(event)=>{setDate(event.target.value)}}
                                invalid={errors.date !== ''}
                                min ={currentDate}
                            />

                            {errors.date && (
                                <FormFeedback>{errors.date}</FormFeedback>
                            )}
                        </FormGroup>

                        <Button type="submit" className='btn btn1' > {buttonText}</Button>
                        <Button type="reset" className='btn btn2 ' onClick={(e) => {
                            setTaskName(" ");
                            setStatus(" ");
                            setDate(" ")
                        }}>Clear</Button>
                    </div>

                </Form>

            </div>
        </div>
    )
}

export default AddTask;