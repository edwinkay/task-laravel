import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard(props) {
    const { auth } = props;
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedPermission, setSelectedPermission] = useState('');

    const roles = ['admin', 'user'];
    const permissions = ['edit articles', 'delete articles', 'view articles', 'all permissions'];

    const handleRoleChange = (e) => setSelectedRole(e.target.value);
    const handlePermissionChange = (e) => setSelectedPermission(e.target.value);

    const assignRole = async () => {
        if (!roles.includes(selectedRole)) return; // Validar que el rol sea válido

        await fetch('/api/assign-role', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ role: selectedRole, userId: auth.user.id })
        });
    };

    const assignPermission = async () => {
        let permissionsToAssign = [];

        if (selectedPermission === 'all permissions') {
            permissionsToAssign = ['edit articles', 'delete articles', 'view articles'];
        } else if (permissions.includes(selectedPermission)) {
            permissionsToAssign = [selectedPermission];
        } else {
            return; // No hacer nada si el permiso no es válido
        }

        await fetch('/api/assign-permission', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ permissions: permissionsToAssign, userId: auth.user.id })
        });
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
                                    {/* Formulario para asignar rol */}
                                    <div>
                                        <h3 className="mt-4 font-bold">Assign Role</h3>
                                        <select value={selectedRole} onChange={handleRoleChange}>
                                            <option value="">Select Role</option>
                                            {roles.map((role) => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                        <button onClick={assignRole}>Assign Role</button>
                                    </div>

                                    {/* Formulario para asignar permiso */}
                                    <div>
                                        <h3 className="mt-4 font-bold">Assign Permission</h3>
                                        <select value={selectedPermission} onChange={handlePermissionChange}>
                                            <option value="">Select Permission</option>
                                            {permissions.map((permission) => (
                                                <option key={permission} value={permission}>{permission}</option>
                                            ))}
                                        </select>
                                        <button onClick={assignPermission}>Assign Permission</button>
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
