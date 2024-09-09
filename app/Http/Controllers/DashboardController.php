<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        if (!auth()->check()) {
            abort(403, 'No estás autorizado para ver esta página.');
        }

        $user = auth()->user();

        // Obtener roles y permisos del usuario
        $roles = $user->roles()->pluck('name')->toArray();
        $permissions = $user->getAllPermissions()->pluck('name')->toArray();

        // Obtener todas las tareas
        $tasks = Task::all(); // Puedes ajustar esto según tus necesidades, por ejemplo, paginación o filtros

        // Mensajes de depuración
        // \Log::info('Roles del usuario:', ['roles' => $roles]);
        // \Log::info('Permisos del usuario:', ['permissions' => $permissions]);

        return inertia('Dashboard', [
            'auth' => [
                'user' => $user,
                'roles' => $roles,
                'permissions' => $permissions,
            ],
            'tasks' => $tasks,
        ]);
    }
}
