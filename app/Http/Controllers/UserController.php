<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getUsers()
    {
        $user = Auth::user();

        // Verificar si el usuario tiene el rol 'admin'
        if ($user->hasRole('admin')) {
            // Obtener todos los usuarios
            $users = User::all();

            return response()->json([
                'users' => $users,
            ]);
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }

    public function assignRole(Request $request)
    {
        // Validar los datos de la solicitud
        $validator = Validator::make($request->all(), [
            'userId' => 'required|exists:users,id',
            'role' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();

        // Verificar si el usuario tiene el rol 'admin'
        if ($user->hasRole('admin')) {
            try {
                $user = User::findOrFail($request->userId);
                $user->syncRoles($request->role);

                return response()->json(['message' => 'Role assigned successfully.']);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to assign role'], 500);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }

    public function assignPermission(Request $request)
    {
        // Validar los datos de la solicitud
        $validator = Validator::make($request->all(), [
            'userId' => 'required|exists:users,id',
            'permissions' => 'required|array',
            'permissions.*' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();

        // Verificar si el usuario tiene el rol 'admin'
        if ($user->hasRole('admin')) {
            try {
                $user = User::findOrFail($request->userId);
                $user->syncPermissions($request->permissions);

                return response()->json(['message' => 'Permissions assigned successfully.']);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to assign permissions'], 500);
            }
        } else {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
    }
}
