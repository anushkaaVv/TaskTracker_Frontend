import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'

function Menus() {
  return (
    <ListGroup flush>
    <ListGroupItem  action href="/" tag="a" > Home</ListGroupItem>
    <ListGroupItem  action href="/view_tasks" tag="a" > View Tasks</ListGroupItem>
    <ListGroupItem  action href="/add_task" tag="a" > Add Task</ListGroupItem>
    <ListGroupItem  action href="#" tag="a" > About</ListGroupItem>
    <ListGroupItem  action href="#" tag="a" > Contact</ListGroupItem>
 </ListGroup>
  )
}

export default Menus;




