import React, { useState, useEffect } from "react";
import { ListGroup, Button, Dropdown, DropdownButton, Spinner, Modal, Form } from "react-bootstrap";
import axios from "axios";

const TaskList = ({ refreshKey, taskStatus, searchQuery }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);  // Modal state
    const [selectedTask, setSelectedTask] = useState(null);  // Task being edited

    useEffect(() => {
        fetchTasks();
    }, [refreshKey, taskStatus, searchQuery]);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/tasks/`);
            const filteredTasks = response.data.filter((task) =>
                taskStatus === "pending" ? !task.completed : task.completed
            ).filter((task) =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setTasks(filteredTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/tasks/${id}/delete/`);
            fetchTasks(); // Refresh task list after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleStatusChange = async (id, currentStatus) => {
        try {
            const updatedStatus = !currentStatus;  // Toggle completed status
            await axios.patch(`http://localhost:8000/api/tasks/${id}/`, {
                completed: updatedStatus,
            });
            fetchTasks();  // Refresh the task list
        } catch (error) {
            console.error("Error updating task status:", error);
        }
    };

    const handleEdit = (task) => {
        setSelectedTask(task);
        setShowModal(true);  // Open the modal
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:8000/api/tasks/${selectedTask.id}/`, {
                title: selectedTask.title,
                description: selectedTask.description,
                completed: selectedTask.completed,
            });
            fetchTasks();  // Refresh tasks after edit
            setShowModal(false);  // Close the modal
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setSelectedTask({ ...selectedTask, [name]: value });
    };

    return (
        <div>
            {loading ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                <ListGroup>
                    {tasks.map((task) => (
                        <ListGroup.Item key={task.id} className="d-flex justify-content-between shadow-sm p-3 mb-3 bg-white rounded">
                            <div>
                                <strong>{task.title}</strong>
                                <p>{task.description}</p>
                            </div>

                            {/* Actions */}
                            <div>
                                <DropdownButton id="dropdown-basic-button"  variant="link">
                                    <Dropdown.Item onClick={() => handleEdit(task)}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleStatusChange(task.id, task.completed)}>
                                        {task.completed ? "Mark as Pending" : "Mark as Completed"}
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDelete(task.id)}>Delete</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

            {/* Edit Task Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTask && (
                        <Form>
                            <Form.Group controlId="taskTitle">
                                <Form.Label>Task Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={selectedTask.title}
                                    onChange={handleModalChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="taskDescription">
                                <Form.Label>Task Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={selectedTask.description}
                                    onChange={handleModalChange}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TaskList;
