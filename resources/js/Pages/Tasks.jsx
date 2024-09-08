// resources/js/Pages/Tasks.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Tasks(props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from the API
        axios.get('/api/tasks', {
            headers: {
                'Authorization': `Bearer ${props.auth.token}` // Asegúrate de que el token esté disponible
            }
        })
            .then(response => {
                setTasks(response.data.data); // Ajusta según la estructura de datos
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

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
                            <h3>Your Tasks:</h3>
                            <ul>
                                {tasks.map(task => (
                                    <li key={task.id}>
                                        <h4>{task.title}</h4>
                                        <p>{task.description}</p>
                                        <p>Due: {task.due_date}</p>
                                        <p>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
