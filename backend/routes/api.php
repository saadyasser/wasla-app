<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\SkillController;
use App\Http\Controllers\API\V1\AuthenticationController;
use App\Http\Controllers\API\V1\ProjectController;
use App\Http\Controllers\API\V1\Freelancer\{
    EducationController,
    PortfolioController,
    SocialLinkController,
    CertificationController,
    FreelancerProfileController
};

// Authenticated routes
Route::post('/login', [AuthenticationController::class, 'login']);

Route::post('/register', [AuthenticationController::class, 'register']);

Route::get('/skills', [SkillController::class, 'index']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {

    // Freelancer profile routes
    Route::get('/freelancer/profile', [FreelancerProfileController::class, 'myProfile']);
    Route::put('freelancer/profile', [FreelancerProfileController::class, 'update']);
    Route::delete('/freelancer/account', [FreelancerProfileController::class, 'destroy']);
    Route::post('/freelancer/skills', [SkillController::class, 'store']);
    Route::post('/freelancer/image', [FreelancerProfileController::class, 'updateProfileImage']);

    // Skill management routes
    Route::put('/freelancer/skills/{skill}', [SkillController::class, 'update']);
    Route::delete('/freelancer/skills/{skill}', [SkillController::class, 'destroy']);

    //Education
    Route::apiResource('/freelancer/educations', EducationController::class);

    // SocialLink
    Route::apiResource('/freelancer/social-links', SocialLinkController::class)->only(['index', 'store', 'update', 'destroy']);

    //Certification
    Route::apiResource('/freelancer/certifications', CertificationController::class)->only(['index', 'store', 'update', 'destroy']);

    //Portfolio
    Route::apiResource('/freelancer/portfolios', PortfolioController::class)->only(['index', 'store', 'update', 'destroy']);






    // Logout route
    Route::post('/logout', [AuthenticationController::class, 'logout']);
});

// Route to view any public freelancer profile by ID
// Route::get('/freelancer/profile/{id}', [FreelancerProfileController::class, 'show']);
