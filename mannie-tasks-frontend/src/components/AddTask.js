import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const AddTask = ({ refreshTasks }) => {
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
            refreshTasks(); // Refresh the task list after adding a new task
            setTitle(""); // Clear the input fields
            setDescription("");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
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

            <Button variant="success" type="submit" style={{marginTop: '10px'}}>
                Add Task
            </Button>
        </Form>
    );
};

export default AddTask;
