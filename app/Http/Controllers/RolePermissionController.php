<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionController extends Controller
{
    public function assignRole(Request $request)
    {
        $request->validate([
            'userId' => 'required|integer|exists:users,id',
            'role' => 'required|string|in:admin,user',
        ]);

        $user = User::find($request->userId);
        $role = Role::findByName($request->role);

        if ($user && $role) {
            $user->syncRoles([$role->name]); // Asegúrate de que el usuario tenga solo el rol asignado
            return response()->json(['message' => 'Role assigned successfully']);
        }

        return response()->json(['message' => 'User or role not found'], 404);
    }

    public function assignPermission(Request $request)
    {
        $request->validate([
            'userId' => 'required|integer|exists:users,id',
            'permissions' => 'required|array',
            'permissions.*' => 'string|in:edit articles,delete articles,view articles,all permissions',
        ]);

        $user = User::find($request->userId);
        $permissions = $request->permissions;

        if ($user) {
            if (in_array('all permissions', $permissions)) {
                // Asigna todos los permisos si se selecciona "all permissions"
                $permissions = ['edit articles', 'delete articles', 'view articles'];
            }

            // Sincroniza los permisos del usuario
            $user->syncPermissions($permissions);

            return response()->json(['message' => 'Permissions assigned successfully']);
        }

        return response()->json(['message' => 'User not found'], 404);
    }
}
