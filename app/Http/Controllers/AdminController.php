<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        // Lógica para mostrar el dashboard del administrador
        return view('admin.dashboard');
    }

    // Otros métodos para la administración
}

