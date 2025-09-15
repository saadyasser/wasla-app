<?php

namespace App\Http\Controllers\API\V1\Freelancer;

use Illuminate\Http\Request;
use App\Models\Certification;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\Freelancer\CertificationResource;
use App\Http\Requests\API\V1\FreelancerProfile\CertificationRequest;


class CertificationController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $freelancer = auth()->user(); // نفرض إنه الفريلانسر مسجّل دخول
        $certifications = $freelancer->freelancerProfile->certifications()->get();

        return $this->successResponse(CertificationResource::collection($certifications), 'Certifications retrieved successfully');
    }

    public function store(CertificationRequest $request): JsonResponse
    {
        $freelancer = auth()->user();

        // نجهز البيانات مع إضافة freelancer_profile_id
        $data = $request->validated();
        $data['freelancer_profile_id'] = $freelancer->freelancerProfile->id;

        $certification = Certification::create($data);

        return $this->successResponse(new CertificationResource($certification), 'Certification created successfully', 201);
    }


    public function update(CertificationRequest $request, $id): JsonResponse
    {
        $freelancer = auth()->user();

        $certification = Certification::findOrFail($id);


        // تحقق إن الشهادة مرتبطة بفريلانسر هذا المستخدم
        if ($certification->freelancerProfile->user->id !== $freelancer->id) {
            return $this->errorResponse('Unauthorized', 403);
        }

        Log::info($request->all());


        $certification->update($request->validated());

        return $this->successResponse(new CertificationResource($certification), 'Certification updated successfully');
    }


    public function destroy($id): JsonResponse
    {
        $certification = Certification::find($id);
        if (!$certification) {
            return $this->errorResponse('Certification not found', 404);
        }

        $certification->delete();

        return $this->successResponse(null, 'Certification deleted successfully');
    }
}
