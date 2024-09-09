<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Asegúrate de incluir esta clase

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth'); // Asegura que el usuario esté autenticado para acceder a cualquier método
    }

    public function index()
    {
        $user = Auth::user();

        // Obtener roles y permisos del usuario
        $roles = $user->roles()->pluck('name')->toArray();
        $permissions = $user->getAllPermissions()->pluck('name')->toArray();

        // Obtener todas las tareas
        $tasks = Task::all(); // O usar Task::paginate(10) para paginación

        return response()->json([
            'user' => $user,
            'roles' => $roles,
            'permissions' => $permissions,
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        // Obtener roles y permisos del usuario
        $roles = $user->roles()->pluck('name')->toArray();
        $permissions = $user->getAllPermissions()->pluck('name')->toArray();

        $task = Task::create($request->all());

        return response()->json([
            'user' => $user,
            'roles' => $roles,
            'permissions' => $permissions,
            'task' => $task,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        // Obtener roles y permisos del usuario
        $roles = $user->roles()->pluck('name')->toArray();
        $permissions = $user->getAllPermissions()->pluck('name')->toArray();

        $task = Task::findOrFail($id);
        $task->update($request->all());

        return response()->json([
            'user' => $user,
            'roles' => $roles,
            'permissions' => $permissions,
            'task' => $task,
        ]);
    }

    public function destroy($id)
    {
        $user = Auth::user();

        // Obtener roles y permisos del usuario
        $roles = $user->roles()->pluck('name')->toArray();
        $permissions = $user->getAllPermissions()->pluck('name')->toArray();

        Task::destroy($id);

        return response()->json([
            'user' => $user,
            'roles' => $roles,
            'permissions' => $permissions,
        ], 204);
    }
}



