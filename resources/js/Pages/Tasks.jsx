import { useEffect, useState } from 'react';
import { fetchTasks } from '../services/taskService'; // Importa el servicio
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Tasks(props) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        const getTasks = async () => {
            try {
                console.log('Token used for request:', props.auth.token); // Verifica el token
                const data = await fetchTasks();
                console.log('Tasks data:', data); // Verifica los datos obtenidos
                setTasks(data); // Ajusta según la estructura de datos
            } catch (error) {
                setError('Error fetching tasks');
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false); // Cambia el estado de carga
            }
        };

        getTasks(); // Llama a la función para obtener las tareas
    }, []); // El array vacío asegura que useEffect solo se ejecute una vez

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
                            {loading ? (
                                <p>Loading...</p> // Mensaje de carga
                            ) : error ? (
                                <p>{error}</p> // Mensaje de error
                            ) : (
                                <>
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
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
