<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Traits\ApiResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ClientProfileResource;

class ClientProfileController extends Controller
{
    use ApiResponse;
    public function myProfile(){
        try{
            // Get the authenticated user
            $user = Auth::user();

            // Check if the user is authenticated and has a client profile
            if (!$user || !$user->clientProfile) {
                return $this->errorResponse("User is not a client or profile not found.", 404);
            }

            // Access the authenticated user's client profile
            $clientProfile = $user->clientProfile;
            $clientProfile->load('user');
            

            return $this->successResponse(new ClientProfileResource($clientProfile), "Client profile retrieved successfully.");
        } catch (\Exception $e) {
            Log::error('Error fetching client profile: ' . $e->getMessage());
            return $this->errorResponse("An error occurred while fetching the client profile.", 500);
        }
    }

    public function editProfile(Request $request){

        try{
            // Get the authenticated user
            $user = Auth::user();

            // Check if the user is authenticated and has a client profile
            if (!$user || !$user->clientProfile) {
                return $this->errorResponse("User is not a client or profile not found.", 404);
            }
            $validated= $request->validate([
                'company_name' => 'sometimes|string|max:255',
                'website' => 'sometimes|url|max:255',
                'company_info' => 'sometimes|string',
            ]);


            // Access the authenticated user's client profile
            $clientProfile = $user->clientProfile;
            $clientProfile->update($validated);
            

            return $this->successResponse(new ClientProfileResource($clientProfile), "Client profile retrieved successfully.");
        } catch (\Exception $e) {
            Log::error('Error fetching client profile: ' . $e->getMessage());
            return $this->errorResponse("An error occurred while fetching the client profile.", 500);
        }

    }
    
}
