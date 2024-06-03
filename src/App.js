import Menus from './components/Menus';
import Home from './components/Home';
import AddTask from './components/AddTask';
import AllTasks from './components/AllTasks';
import About from './components/About';
import './App.css';
import Header from './components/Header';
import { Container, Col, Row } from 'reactstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div style={{ margin: "0", padding: "0" }}>
      <ToastContainer/>
      <Router>
        <Header />
        <Container>
          <Row>
            <Col sm={3}>
              <Menus />
            </Col>
            <Col  sm={9} className='contentSide' >
              <Routes>
                <Route path="/" Component={Home} />
                <Route path="/add_task" Component={AddTask} />
                <Route path="/view_tasks" Component={AllTasks} />
                <Route path="/update_task/:id" Component={AddTask} />
                <Route path="/about" Component={About} />

              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
