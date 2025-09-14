<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\SkillController;
use App\Http\Controllers\API\V1\AuthenticationController;
use App\Http\Controllers\Api\V1\FreelancerProfileController;

// Authenticated routes
Route::post('/login', [AuthenticationController::class, 'login']);

Route::post('/register', [AuthenticationController::class, 'register']);

Route::get('/skills', [SkillController::class, 'index']);



Route::middleware('auth:sanctum')->group(function () {
    // Route to view the authenticated user's own profile
    Route::get('/freelancer/profile', [FreelancerProfileController::class, 'myProfile']);

    // Route to add a skill to the authenticated user's profile
    Route::post('/freelancer/skills', [SkillController::class, 'store']);

    Route::post('/logout', [AuthenticationController::class, 'logout']);
});

// Route to view any public freelancer profile by ID
// Route::get('/freelancer/profile/{id}', [FreelancerProfileController::class, 'show']);


