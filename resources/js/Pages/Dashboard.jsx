import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
    const { auth } = props;
    const roles = auth?.roles || [];
    const permissions = auth?.permissions || [];

    console.log('props:', props);
    console.log('Roles:', roles);
    console.log('Permissions:', permissions);

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
                            <p>You're logged in!</p>

                            {/* Mostrar roles */}
                            {roles.length > 0 && (
                                <div>
                                    <h3 className="mt-4 font-bold">Roles:</h3>
                                    <ul>
                                        {roles.map((role, index) => (
                                            <li key={index}>{role}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Mostrar permisos */}
                            {permissions.length > 0 && (
                                <div>
                                    <h3 className="mt-4 font-bold">Permissions:</h3>
                                    <ul>
                                        {permissions.map((permission, index) => (
                                            <li key={index}>{permission}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
