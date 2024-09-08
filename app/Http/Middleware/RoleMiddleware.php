<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle($request, Closure $next, $role)
    {
        if (!Auth::check() || Auth::user()->role !== $role) {
            // Si el usuario no está autenticado o no tiene el rol adecuado, redirige
            return redirect('/dashboard');
        }

        return $next($request);
    }
}

