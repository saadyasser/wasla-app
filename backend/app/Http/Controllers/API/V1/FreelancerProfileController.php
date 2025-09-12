<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\ProjectStatus;
use App\Http\Traits\ApiResponse;
use App\Models\FreelancerProfile;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Freelancer\FreelancerProfileResource;

class FreelancerProfileController extends Controller
{
    use ApiResponse;

    /**
     * Display a freelancer profile.
     *
     * @param FreelancerProfile $freelancerProfile
     * @return \Illuminate\Http\JsonResponse
     */

    public function myProfile()
    {
        try {
            // Get the authenticated user
            $user = Auth::user();

            // Check if the user is authenticated and has a freelancer profile
            if (!$user || !$user->freelancerProfile) {
                return $this->errorResponse("User is not a freelancer or profile not found.", 404);
            }

            // Access the authenticated user's freelancer profile
            $freelancerProfile = $user->freelancerProfile;

            $freelancerProfile->loadMissing([
                'user:id,name,email,role,created_at',
                'skills:id,name',
                'portfolios:id,freelancer_profile_id,title,url,description',
                'socialLinks:id,freelancer_profile_id,platform_name,url',
                'certifications:id,freelancer_profile_id,certification_name,certification_url',
                'educations:id,freelancer_profile_id,university,degree,field,from,to',
                'projects' => function ($query) {
                    $query->active()->with([
                        'skills:id,name',
                        'clientProfile:id,user_id,company_name',
                        'review',
                    ]);
                },
                'projects.clientProfile.user',
            ]);

            $freelancerProfile->loadCount([
                'projects as completed_projects_count' => fn($query) =>
                $query->where('status', ProjectStatus::Completed->value),
                'reviews as reviews_count',
            ]);

            $freelancerProfile->append([
                'average_rating',
                'total_earnings',
            ]);

            // ApiResponse
            return $this->successResponse(
                new FreelancerProfileResource($freelancerProfile),
                'Freelancer profile retrieved successfully',
                200
            );
        } catch (\Exception $e) {
            Log::error('Failed to retrieve freelancer profile: ' . $e->getMessage());
            return $this->errorResponse("Failed to retrieve freelancer profile", 500);
        }
    }

    public function update() {}
    public function destroy() {}
}
