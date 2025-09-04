<?php

namespace App\Http\Controllers\API\V1;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Services\Profile\ProfileFactory;
use App\Http\Requests\API\V1\Auth\LoginRequest;
use App\Http\Requests\API\V1\Auth\RegisterRequest;
use Illuminate\Support\Facades\Log;


class AuthenticationController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'access_token' => $token,

            ], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function register(RegisterRequest $request, ProfileFactory $profileFactory): JsonResponse
    {

        try {
            return DB::transaction(function () use ($request, $profileFactory) {
                $data = $request->validated();
                $data['password'] = Hash::make($data['password']);

                $user = User::create($data);

                $creator = $profileFactory->make($user);
                $creator->create($user);

                return response()->json([
                    'message' => 'Account created successfully',
                    'user' => $user,
                ], 201);
            });
        } catch (\Exception $e) {
            Log::error("Registration failed: " . $e->getMessage());
            return response()->json(['message' => 'Registration failed. Please try again.'], 500);
        }
    }


    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout successful'
        ], 200);
    }
}
