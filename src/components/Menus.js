import React from 'react'
import { ListGroup} from 'reactstrap'
import { Link } from 'react-router-dom'

function Menus() {
  return (
    <div style={{ marginTop: "30px" }}   className='menu'>
      <ListGroup flush >

        <Link className="list-group-item list-group-item-action" tag="a" to="/" >  Home</Link>
        <Link className="list-group-item list-group-item-action" tag="a" to="/view_tasks"> View Tasks</Link>
        <Link className="list-group-item list-group-item-action" tag="a" to="/add_task"> Add Task</Link>
        <Link className="list-group-item list-group-item-action" tag="a" to="#"> About</Link>
        <Link className="list-group-item list-group-item-action" tag="a" to="#"> feedback</Link>
      </ListGroup>
    </div>
  )
}

export default Menus;




