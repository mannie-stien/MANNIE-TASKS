import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  InputGroup,
  Form,
} from "react-bootstrap";
import TaskList from "./components/TaskList";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const refreshTasks = () => setRefresh(!refresh);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleAddTaskModal = () => setShowAddTaskModal(true);
  const handleCloseAddTaskModal = () => setShowAddTaskModal(false);

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg" >
        <Navbar.Brand href="#" style={{marginLeft: '10px'}}>Mannie Tasks</Navbar.Brand>
        <Nav className="ml-auto">
          <Button variant="success" onClick={handleAddTaskModal}>
            Add Task
          </Button>
        </Nav>
      </Navbar>

      <Container className="mt-5">
        <Row>
          {/* Search Bar */}
          <Col md={12} className="mb-4">
            <InputGroup>
              <Form.Control
                placeholder="Search tasks..."
                onChange={handleSearchChange}
                value={searchQuery}
              />
            </InputGroup>
          </Col>
        </Row>

        <Row>
          {/* Pending Tasks Column */}
          <Col md={6}>
            <h4>Pending Tasks</h4>
            <TaskList
              refreshKey={refresh}
              taskStatus="pending"
              searchQuery={searchQuery}
            />
          </Col>

          {/* Completed Tasks Column */}
          <Col md={6}>
            <h4>Completed Tasks</h4>
            <TaskList
              refreshKey={refresh}
              taskStatus="completed"
              searchQuery={searchQuery}
            />
          </Col>
        </Row>
      </Container>

      {/* Add Task Modal */}
      <AddTaskModal
        show={showAddTaskModal}
        onClose={handleCloseAddTaskModal}
        refreshTasks={refreshTasks}
      />
    </div>
  );
}

export default App;
