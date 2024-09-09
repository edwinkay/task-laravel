import React from 'react';
import { deleteTask, updateTask } from '../services/taskService';
import '../../css/TaskManager.css';

const TaskList = ({ tasks, onEdit, onTaskUpdate }) => {
    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            onTaskUpdate();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleCompletion = async (task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            await updateTask(task.id, updatedTask);
            onTaskUpdate();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <li key={task.id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <label>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleCompletion(task)}
                        />
                        {task.completed ? 'Completada' : 'Incompleta'}
                    </label>
                    <button className="edit" onClick={() => onEdit(task)}>Editar</button>
                    <button onClick={() => handleDelete(task.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
