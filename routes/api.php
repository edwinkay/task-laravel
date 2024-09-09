<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AdminApiController;
use App\Http\Controllers\RolePermissionController;

// Ruta para obtener información del usuario autenticado
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Rutas accesibles solo para administradores
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/admin/data', [AdminApiController::class, 'getData'])->name('admin.data');
    // Otras rutas API para administradores
});

// Rutas accesibles para usuarios autenticados
Route::middleware('auth:sanctum')->group(function () {
    // Rutas para tareas
    Route::apiResource('tasks', TaskController::class);
});
Route::post('/api/assign-role', [RolePermissionController::class, 'assignRole']);
Route::post('/api/assign-permission', [RolePermissionController::class, 'assignPermission']);

Route::middleware('auth:sanctum')->get('/tasks', [TaskController::class, 'index']);
