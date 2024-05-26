import Menus from './components/Menus';
import Home from './components/Home';
import AddTask from './components/AddTask';
import AllTasks from './components/AllTasks';
import './App.css';
import Header from './components/Header';
import { Container, Col, Row } from 'reactstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Header/>
    
    <Container>
      <Row>
        <Col md ={4}>
          <Menus/>
        </Col>
        <Col md ={8} >
          <Routes>
            <Route path="/" Component={Home}/>
            <Route path="/add_task" Component={AddTask}/>
            <Route path="/view_tasks" Component={AllTasks}/>
            <Route path ="/update_task/:id" Component={AddTask}/>
            
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>
  );
}

export default App;
