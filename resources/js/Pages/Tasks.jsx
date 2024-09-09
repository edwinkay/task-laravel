import React, { useState, useEffect } from 'react';
import { fetchTasks } from '../services/taskService'; // Ajusta la ruta según sea necesario
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TaskForm from '../Components/TaskForm';
import TaskList from '../Components/TaskList';
import '../../css/TaskManager.css';

export default function Tasks(props) {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTasks = async () => {
            try {
                // console.log('Token used for request:', props.auth.token);
                const data = await fetchTasks();
                setTasks(data); // Ajusta según la estructura de datos
            } catch (error) {
                setError('Error fetching tasks');
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        getTasks();
    }, []); // El array vacío asegura que useEffect solo se ejecute una vez

    const handleEdit = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleFormClose = () => {
        setEditingTask(null);
        setIsModalOpen(false);
        handleTaskUpdate(); // Recargar tareas después de cerrar el formulario
    };


    const handleTaskUpdate = async () => {
        try {
            const data = await fetchTasks(); // Recargar tareas
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>}
        >
            <Head title="Tasks" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="fixed-header">
                                <input
                                    type="text"
                                    placeholder="Buscar tareas..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                                <button
                                    onClick={() => {
                                        setEditingTask(null);
                                        setIsModalOpen(true);
                                    }}
                                    className="add-task-button"
                                >
                                    Agregar Nueva Tarea
                                </button>
                            </div>
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p>{error}</p>
                            ) : (
                                <>
                                    <TaskList
                                        tasks={filteredTasks}
                                        onEdit={handleEdit}
                                        onTaskUpdate={handleTaskUpdate}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingTask ? 'Editar Tarea' : 'Agregar Nueva Tarea'}</h2>
                            <button onClick={handleFormClose}>Cerrar</button>
                        </div>
                        <div className="modal-body">
                            <TaskForm existingTask={editingTask} onFormClose={handleFormClose} />
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
