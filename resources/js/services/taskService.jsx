import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/tasks'; // URL actual del servidor

// Obtener todas las tareas (GET)
export const fetchTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        console.log('Response from API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        throw new Error('Error al obtener las tareas');
    }
};

// Agregar una nueva tarea (POST)
export const addTask = async (task) => {
    try {
        const response = await axios.post(API_URL, task, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al agregar la tarea:', error);
        throw new Error('Error al agregar la tarea');
    }
};

// Actualizar una tarea existente (PUT)
export const updateTask = async (taskId, updatedTask) => {
    try {
        const response = await axios.put(`${API_URL}/${taskId}`, updatedTask, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        throw new Error('Error al actualizar la tarea');
    }
};

// Eliminar una tarea (DELETE)
export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`${API_URL}/${taskId}`);
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        throw new Error('Error al eliminar la tarea');
    }
};
