<?php

namespace App\Http\Controllers\API\V1\Freelancer;

use Illuminate\Http\Request;
use App\Models\Education;
use App\Http\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Resources\Freelancer\EducationResource;
use App\Http\Requests\API\V1\FreelancerProfile\EducationRequest;


class EducationController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $freelancer = auth()->user();
        $educations = $freelancer->freelancerProfile->educations()->get();

        return $this->successResponse(EducationResource::collection($educations), 'Educations retrieved successfully');
    }

    public function store(EducationRequest $request): JsonResponse
    {
        $freelancer = auth()->user();


        $data = $request->validated();
        $data['freelancer_profile_id'] = $freelancer->freelancerProfile->id;

        $education = Education::create($data);

        return $this->successResponse(new EducationResource($education), 'Education created successfully', 201);
    }


    public function update(EducationRequest $request, $id): JsonResponse
    {
        $freelancer = auth()->user();

        $education = Education::findOrFail($id);



        if ($education->freelancerProfile->user->id !== $freelancer->id) {
            return $this->errorResponse('Unauthorized', 403);
        }

        Log::info($request->all());


        $education->update($request->validated());

        return $this->successResponse(new EducationResource($education), 'Education updated successfully');
    }


    public function destroy($id): JsonResponse
    {
        $education = Education::find($id);
        if (!$education) {
            return $this->errorResponse('Education not found', 404);
        }

        $education->delete();

        return $this->successResponse(null, 'Education deleted successfully');
    }
}
