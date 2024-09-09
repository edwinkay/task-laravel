import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Dashboard(props) {
    const { auth } = props;
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedPermission, setSelectedPermission] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    const roles = ['admin', 'user'];
    const permissions = ['edit articles', 'delete articles', 'view articles', 'all permissions'];

    useEffect(() => {
        if (auth.roles.includes('admin')) {
            fetch('/api/users')
                .then(response => response.json())
                .then(data => {
                    if (data.users) {
                        setUsers(data.users);
                    }
                });
        }
    }, [auth.roles]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
            return () => clearTimeout(timer); // Clear timer on component unmount
        }
    }, [message]);

    const handleUserChange = (e) => setSelectedUserId(e.target.value);
    const handleRoleChange = (e) => setSelectedRole(e.target.value);
    const handlePermissionChange = (e) => setSelectedPermission(e.target.value);

    const updateUser = async () => {
        if (!selectedUserId) return; // Validar que se haya seleccionado un usuario

        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';

        if (!csrfToken) {
            console.error('CSRF token not found.');
            return;
        }

        try {
            // Asignar rol
            if (roles.includes(selectedRole)) {
                await fetch('/api/assign-role', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify({ role: selectedRole, userId: selectedUserId })
                });
            }

            // Asignar permisos
            let permissionsToAssign = [];
            if (selectedPermission === 'all permissions') {
                permissionsToAssign = ['edit articles', 'delete articles', 'view articles'];
            } else if (permissions.includes(selectedPermission)) {
                permissionsToAssign = [selectedPermission];
            }

            if (permissionsToAssign.length > 0) {
                await fetch('/api/assign-permission', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: JSON.stringify({ permissions: permissionsToAssign, userId: selectedUserId })
                });
            }

            // Mostrar mensaje de éxito y limpiar selectores
            setMessage('Usuario actualizado exitosamente.');
            setSelectedUserId('');
            setSelectedRole('');
            setSelectedPermission('');
        } catch (error) {
            console.error('Error updating user:', error);
            setMessage('Error al actualizar el usuario.');
        }
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Mostrar mensaje de éxito o error en la parte superior */}
                            {message && (
                                <div className={`mb-4 p-4 text-white ${message.includes('Error') ? 'bg-red-500' : 'bg-green-500'} rounded`}>
                                    {message}
                                </div>
                            )}

                            <p>Bienvenido!</p>

                            {/* Mostrar roles */}
                            {auth.roles.length > 0 && (
                                <div>
                                    <h3 className="mt-4 font-bold">Tu rol es:</h3>
                                    <ul>
                                        {auth.roles.map((role, index) => (
                                            <li key={index}>{role}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Mostrar permisos */}
                            {auth.permissions.length > 0 && (
                                <div>
                                    <h3 className="mt-4 font-bold">Tienes permiso para:</h3>
                                    <ul>
                                        {auth.permissions.map((permission, index) => (
                                            <li key={index}>{permission}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Solo mostrar opciones de asignación si el usuario es 'admin' */}
                            {auth.roles.includes('admin') && (
                                <>
                                    {/* Select para elegir usuario */}
                                    <div>
                                        <h3 className="mt-4 font-bold">Select User</h3>
                                        <select value={selectedUserId} onChange={handleUserChange}>
                                            <option value="">Select User</option>
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name} ({user.email})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Select para asignar rol */}
                                    <div>
                                        <h3 className="mt-4 font-bold">Assign Role</h3>
                                        <select value={selectedRole} onChange={handleRoleChange}>
                                            <option value="">Select Role</option>
                                            {roles.map((role) => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Select para asignar permiso */}
                                    <div>
                                        <h3 className="mt-4 font-bold">Assign Permission</h3>
                                        <select value={selectedPermission} onChange={handlePermissionChange}>
                                            <option value="">Select Permission</option>
                                            {permissions.map((permission) => (
                                                <option key={permission} value={permission}>{permission}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Botón para actualizar usuario */}
                                    <div className="mt-4">
                                        <button onClick={updateUser} className="bg-blue-500 text-white px-4 py-2 rounded">
                                            Update User
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
