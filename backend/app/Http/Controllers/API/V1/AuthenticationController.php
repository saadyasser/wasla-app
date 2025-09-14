<?php

namespace App\Http\Controllers\API\V1;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use App\Services\Auth\RegistrationService;
use App\Http\Requests\API\V1\Auth\LoginRequest;
use App\Http\Requests\API\V1\Auth\RegisterRequest;


class AuthenticationController extends Controller
{
    use ApiResponse;
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return $this->errorResponse('Invalid credentials', 401);
        }

        // If credentials are valid, create a new access token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return a consistent JSON response using the trait
        return $this->successResponse([
            'user' => UserResource::make($user),
            'access_token' => $token,
        ], 'Login successful', 200);
    }

    public function register(RegisterRequest $request, RegistrationService $registrationService): JsonResponse
    {

        try {
            $user = $registrationService->registerUser($request->validated());

            return $this->successResponse([
                'user' => UserResource::make($user),
                'access_token' => $user->createToken('auth_token')->plainTextToken,
            ], 'Account created successfully', 201);
        } catch (\Exception $e) {
            Log::error("Registration failed: " . $e->getMessage());
            return $this->errorResponse('Registration failed. Please try again.', 500);
        }
    }


    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->successResponse(null, 'Logout successful', 200);
    }
}
