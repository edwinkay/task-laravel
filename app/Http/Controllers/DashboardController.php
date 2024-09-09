<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
public function index()
{
    if (!auth()->check()) {
        abort(403, 'No estás autorizado para ver esta página.');
    }

    $user = auth()->user();

    // Obtener roles y permisos
    $roles = $user->roles()->pluck('name')->toArray();
    $permissions = $user->getAllPermissions()->pluck('name')->toArray();

    // Mensajes de depuración
    // \Log::info('Roles del usuario:', ['roles' => $roles]);
    // \Log::info('Roles del usuario:', ['roles' => $user->roles]);

    // \Log::info('Permisos del usuario:', ['permissions' => $permissions]);

    return inertia('Dashboard', [
        'auth' => [
            'user' => $user,
            'roles' => $roles,
            'permissions' => $permissions,
        ],
    ]);
}


}

