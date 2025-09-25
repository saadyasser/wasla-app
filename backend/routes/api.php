<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\SkillController;
use App\Http\Controllers\API\V1\AuthenticationController;
use App\Http\Controllers\API\V1\ProjectController;
use App\Http\Controllers\API\V1\ClientProfileController;
use App\Http\Controllers\API\V1\ReviewController;
use App\Http\Controllers\API\V1\Freelancer\{
    EducationController,
    PortfolioController,
    SocialLinkController,
    CertificationController,
    FreelancerProfileController,
    ProposalController
};


// Public Routes
Route::post('/login', [AuthenticationController::class, 'login']);
Route::post('/register', [AuthenticationController::class, 'register']);
Route::get('/skills', [SkillController::class, 'index']);
Route::get('/projects', [ProjectController::class, 'index']);

// Freelancer Routes
Route::middleware(['auth:sanctum', 'check.freelancer'])->group(function () {
    // Freelancer Profile
    Route::get('/freelancer/profile', [FreelancerProfileController::class, 'myProfile']);
    Route::put('/freelancer/profile', [FreelancerProfileController::class, 'update']);
    Route::delete('/freelancer/profile', [FreelancerProfileController::class, 'destroy']);
    Route::post('/freelancer/skills', [SkillController::class, 'store']);
    Route::post('/freelancer/image', [FreelancerProfileController::class, 'updateProfileImage']);
    //Education
    Route::apiResource('/freelancer/educations', EducationController::class)->except('show');
    // SocialLink
    Route::apiResource('/freelancer/social-links', SocialLinkController::class)->only(['index', 'store', 'update', 'destroy']);
    //Certification
    Route::apiResource('/freelancer/certifications', CertificationController::class)->only(['index', 'store', 'update', 'destroy']);
    //Portfolio
    // Route::apiResource('/freelancer/portfolios', PortfolioController::class)->only(['index', 'store', 'update', 'destroy']);

    //Proposal Freelancer
    Route::post('/projects/{project}/apply', [ProposalController::class, 'store']);
    Route::put('/freelancer/proposals/{proposal}', [ProposalController::class, 'update']);
    Route::delete('/freelancer/proposals/{proposal}', [ProposalController::class, 'destroy']);
});

// Client Routes
Route::middleware(['auth:sanctum', 'check.client'])->group(function () {
    Route::get('/client/profile', [ClientProfileController::class, 'show']);
    Route::put('/client/profile', [ClientProfileController::class, 'update']);

    Route::get('/projects/{project}', [ProjectController::class, 'show']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);

    Route::post('/projects/{project}/reviews', [ReviewController::class, 'store']);
    Route::put('/reviews/{review}', [ReviewController::class, 'update']);
    Route::put('proposal/{proposal}/accept', [\App\Http\Controllers\API\V1\ClientProfile\ProposalController::class, 'acceptProposal']);
});

// Logout
Route::middleware('auth:sanctum')->post('/logout', [AuthenticationController::class, 'logout']);


// Route to view any public freelancer profile by ID
// Route::get('/freelancer/profile/{id}', [FreelancerProfileController::class, 'show']);
