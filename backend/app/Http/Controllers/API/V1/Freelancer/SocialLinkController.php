<?php

namespace App\Http\Controllers\API\V1\Freelancer;

use App\Models\SocialLink;
use Illuminate\Http\Request;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\Freelancer\SocialLinkResource;
use App\Http\Requests\API\V1\FreelancerProfile\SocialLinkRequest;

class SocialLinkController extends Controller
{
    use ApiResponse;


    public function index(): JsonResponse
    {
        $freelancer = auth()->user();
        $socialLinks = $freelancer->freelancerProfile->socialLinks()->get();

        return $this->successResponse(SocialLinkResource::collection($socialLinks), 'Social links retrieved successfully');
    }


    public function store(SocialLinkRequest $request): JsonResponse
    {
        $freelancer = auth()->user();

        $data = $request->validated();

        $data['freelancer_profile_id'] = $freelancer->freelancerProfile->id;

        $socialLink = SocialLink::create($data);

        return $this->successResponse(new SocialLinkResource($socialLink), 'Social link created successfully', 201);
    }


    public function update(SocialLinkRequest $request, $id): JsonResponse
    {
        $freelancer = auth()->user();
        $socialLink = SocialLink::findOrFail($id);


        if ($socialLink->freelancerProfile->user->id !== $freelancer->id) {
            return $this->errorResponse('Unauthorized', 403);
        }

        $socialLink->update($request->validated());

        return $this->successResponse(new SocialLinkResource($socialLink), 'Social link updated successfully');
    }


    public function destroy($id): JsonResponse
    {
        $socialLink = SocialLink::find($id);
        if (!$socialLink) {
            return $this->errorResponse('Social link not found', 404);
        }

        $socialLink->delete();

        return $this->successResponse(null, 'Social link deleted successfully');
    }
}
