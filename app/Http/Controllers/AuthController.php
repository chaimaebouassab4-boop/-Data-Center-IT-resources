<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Role;

class AuthController extends Controller
{
    public function showLogin()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            
            \App\Models\Log::create([
                'user_id' => Auth::id(),
                'action' => 'Login',
                'details' => 'User logged in successfully.',
            ]);

            // Redirect based on role
            $user = Auth::user();
            return redirect('/');//$this->redirectBasedOnRole($user);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            \App\Models\Log::create([
                'user_id' => Auth::id(),
                'action' => 'Logout',
                'details' => 'User logged out.',
            ]);
        }

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    private function redirectBasedOnRole($user)
    {
        if (!$user->role) {
            return redirect('/');
        }

        switch ($user->role->name) {
            case 'Data Center Administrator':
                return redirect()->route('admin.dashboard');
            case 'Technical Resource Manager':
                return redirect()->route('manager.dashboard');
            case 'Internal User':
                return redirect()->route('user.dashboard');
            default:
                return redirect('/');
        }
    }
}
