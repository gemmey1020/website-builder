<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    // 🟢 جلب جميع المستخدمين
    public function index()
    {
        return response()->json(User::all());
    }

    // 🔵 عرض مستخدم واحد
    public function show($id)
    {
        return response()->json(User::findOrFail($id));
    }

    // 🟠 إضافة مستخدم جديد
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($user, 201);
    }

    // 🟣 تعديل بيانات المستخدم
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update($request->only(['name', 'email']));

        return response()->json($user);
    }

    // 🔴 حذف مستخدم
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
    public function getTheme(Request $request) {
        return response()->json(['theme' => $request->user()->theme]);
    }

    public function updateTheme(Request $request) {
        $request->validate(['theme' => 'required|string']);
        $user = $request->user();
        $user->theme = $request->theme;
        $user->save();

        return response()->json(['message' => 'Theme updated successfully']);
    }
}
