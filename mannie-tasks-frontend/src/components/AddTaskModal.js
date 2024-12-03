import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddTaskModal = ({ show, onClose, refreshTasks }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/tasks/", {
                title,
                description,
                completed: false,
            });
            refreshTasks();  // Refresh the task list after adding a new task
            onClose();  // Close the modal after submission
            setTitle("");  // Clear the fields
            setDescription("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="taskTitle">
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="taskDescription">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{marginTop: '10px'}}>
                        Add Task
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddTaskModal;
