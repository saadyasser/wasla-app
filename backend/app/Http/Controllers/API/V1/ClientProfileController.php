<?php

namespace App\Http\Controllers\ApI\V1;

use Illuminate\Http\Request;
use App\Http\Traits\ApiResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\ClientProfileService;
use App\Http\Resources\ClientProfileResource;
use App\Http\Resources\ClientBasicInfoResource;
use App\Http\Requests\API\V1\ClientProfile\UpdateClientProfileRequest;

class ClientProfileController extends Controller
{
    use ApiResponse;
    protected ClientProfileService $service;

    public function __construct(ClientProfileService $service)
    {
        $this->service = $service;
    }

    public function show()
    {
        try {
            // المستخدم مضمون أنه عميل
            $clientProfile = $this->service->loadProfileWithRelations(Auth::user());

            return $this->successResponse(
                new ClientProfileResource($clientProfile),
                "Client profile retrieved successfully."
            );
        } catch (\Exception $e) {
            Log::error('Error fetching client profile: ' . $e->getMessage());
            return $this->errorResponse($e->getMessage(), 404);
        }
    }


    public function update(UpdateClientProfileRequest $request)
    {
        try {
            $user = Auth::user();

            $userData = $request->only(['name', 'email']); // بيانات جدول users
            $clientData = $request->except(['name', 'email']); // بيانات جدول client_profiles

            $profile = $this->service->updateProfile($user, $userData, $clientData);

            return $this->successResponse(
                new ClientBasicInfoResource($profile),
                'Client profile updated successfully',200
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 404);
        }
    }


    // public function destroy()
    // {

    //     try {
    //         $this->service->deleteClientAccount(Auth::user());

    //         return $this->successResponse(null, 'Client account deleted successfully', 200);
    //     } catch (\Exception $e) {
    //         return $this->errorResponse($e->getMessage(), 403);
    //     }
    // }
}
