<?php

namespace App\Http\Controllers\API\V1\Freelancer;

use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponse;
use App\Http\Requests\API\V1\FreelancerProfile\FreelancerUpdateRequest;
use App\Http\Resources\Freelancer\FreelancerProfileResource;
use App\Http\Resources\Freelancer\FreelancerBasicInfoResource;
use App\Services\Freelancer\FreelancerProfileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FreelancerProfileController extends Controller
{
    use ApiResponse;

    protected $service;

    public function __construct(FreelancerProfileService $service)
    {
        $this->service = $service;
    }

    public function myProfile()
    {
        $user = Auth::user();

        if (!$user || !$user->freelancerProfile) {
            return $this->errorResponse("User is not a freelancer or profile not found.", 404);
        }

        $freelancerProfile = $this->service->loadProfileWithRelations($user);

        return $this->successResponse(
            new FreelancerProfileResource($freelancerProfile),
            'Freelancer profile retrieved successfully',
            200
        );
    }

    public function updateProfileImage(Request $request)
    {
        $request->validate([
            'profile_image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = Auth::user();
        $freelancer = $user->freelancerProfile;

        $freelancer = $this->service->updateProfileImage($freelancer, $request->file('profile_image'));

        return $this->successResponse([
            'profile_image_url' => $freelancer->profile_image_url,
        ], 'Profile image updated successfully', 200);
    }

    public function update(FreelancerUpdateRequest $request)
    {
        $user = Auth::user();

        $freelancer = $this->service->updateProfile(
            $user,
            $request->only(['name', 'email']),
            $request->only(['title', 'bio', 'hourly_rate', 'location', 'available'])
        );

        return $this->successResponse([
            'message' => 'Freelancer profile updated successfully',
            'freelancer' => new FreelancerBasicInfoResource($freelancer)
        ]);
    }

    public function destroy()
    {
        $user = Auth::user();

        if (!$user->freelancerProfile) {
            return $this->errorResponse('Freelancer profile not found', 404);
        }

        $this->service->deleteFreelancerAccount($user);

        return $this->successResponse([], 'Freelancer account deleted successfully', 200);
    }
}
