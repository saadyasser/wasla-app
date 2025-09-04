<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\AuthenticationController;

// Authenticated routes
Route::post('/login', [AuthenticationController::class, 'login']);

Route::post('/register', [AuthenticationController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {

    //Profile Routes
    Route::post('/logout', [AuthenticationController::class, 'logout']);

});





