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

    // استرجاع روابط الاجتماعية الخاصة بالمستخدم المسجّل
    public function index(): JsonResponse
    {
        $freelancer = auth()->user();
        $socialLinks = $freelancer->freelancerProfile->socialLinks()->get();

        return $this->successResponse(SocialLinkResource::collection($socialLinks), 'Social links retrieved successfully');
    }

    // تخزين رابط اجتماعي جديد
    public function store(SocialLinkRequest $request): JsonResponse
    {
        $freelancer = auth()->user();

        $data = $request->validated();
        // لو عندك حقل foreign key في جدول social_links مثل freelancer_profile_id
        $data['freelancer_profile_id'] = $freelancer->freelancerProfile->id;

        $socialLink = SocialLink::create($data);

        return $this->successResponse(new SocialLinkResource($socialLink), 'Social link created successfully', 201);
    }

    // تحديث رابط اجتماعي
    public function update(SocialLinkRequest $request, $id): JsonResponse
    {
        $freelancer = auth()->user();
        $socialLink = SocialLink::findOrFail($id);

        // تحقق من ملكية الرابط الاجتماعي للمستخدم الحالي
        if ($socialLink->freelancerProfile->user->id !== $freelancer->id) {
            return $this->errorResponse('Unauthorized', 403);
        }

        $socialLink->update($request->validated());

        return $this->successResponse(new SocialLinkResource($socialLink), 'Social link updated successfully');
    }

    // حذف رابط اجتماعي
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
