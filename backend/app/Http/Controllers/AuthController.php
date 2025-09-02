<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials=$request->validate([
            'email'=>'required|email',
            'password'=>'required',
            'role' => 'required|in:freelancer,client,support' // check enum

        ]);
        $user=User::where('email',$credentials['email'])
        ->where('role',$credentials['role']
        )->first();

      if(!$user ||!Hash::check($credentials['password'],$user->password)){
        return response()->json(['message'=>'Invalid credentials'],401);

     }

        $token=$user->createToken('auth_token')->plainTextToken;
        return response()->json(['access_token'=>$token,'token_type'=>'Bearer',]);

    }
}
