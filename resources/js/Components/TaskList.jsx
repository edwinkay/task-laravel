import React from 'react';
import { deleteTask, updateTask } from '../services/taskService'; // Ajusta la ruta según sea necesario

const TaskList = ({ tasks, onEdit, onTaskUpdate, userRole }) => {

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
                <li key={task.id} className="task-item">
                    <h3 className="titulo">{task.title}</h3>
                    <p>{task.description}</p>
                    <label>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleCompletion(task)}
                            disabled={userRole === 'user'} // Deshabilitar si es 'user'
                        />
                        {task.completed ? 'Completada' : 'Incompleta'}
                    </label>
                    {userRole === 'admin' && ( // Solo permitir editar/eliminar a admin
                        <>
                            <button className="edit" onClick={() => onEdit(task)}>Editar</button>
                            <button className="delete" onClick={() => handleDelete(task.id)}>Eliminar</button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
