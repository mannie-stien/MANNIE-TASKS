import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const EditTask = ({ taskId, refreshTasks }) => {
    const [task, setTask] = useState({ title: "", description: "" });

    useEffect(() => {
        const fetchTask = async () => {
            const response = await axios.get(`http://localhost:8000/api/tasks/${taskId}/`);
            setTask(response.data);
        };

        fetchTask();
    }, [taskId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/tasks/${taskId}/`, {
                title: task.title,
                description: task.description,
                completed: task.completed,
            });
            refreshTasks();  // Refresh task list after editing
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="taskTitle">
                <Form.Label>Task Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="taskDescription">
                <Form.Label>Task Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Save Changes
            </Button>
        </Form>
    );
};

export default EditTask;
