<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController; // Verifica que esta línea esté presente
use App\Http\Controllers\AdminApiController;

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
Route::middleware('auth:sanctum')->get('/tasks', [TaskController::class, 'index']);
