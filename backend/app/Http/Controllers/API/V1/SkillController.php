<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Skill;
use Illuminate\Http\Request;
use App\Http\Traits\ApiResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\Freelancer\SkillService;
use App\Http\Resources\Freelancer\SkillResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Requests\API\V1\FreelancerProfile\AddSkillRequest;

class SkillController extends Controller
{
    use ApiResponse;

    /**
     * Display a listing of the skills.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    // php v8 constructor property promotion
    public function __construct(protected SkillService $skillService) {}

    public function index()
    {
        return $this->successResponse(SkillResource::collection(Skill::all()), 'Skills retrieved successfully', 200);
    }


    public function store(AddSkillRequest $request)
    {
        try {

            $freelancer = Auth::user()->freelancerProfile;

            if (!$freelancer) {
                return $this->errorResponse('Freelancer profile not found for this user', 404);
            }
            // Use the SkillService to add the skill
            $skill = $this->skillService->addSkillToFreelancer(
                $freelancer,
                $request->validated('skill_id'),
                $request->validated('name')
            );

            return $this->successResponse(
                new SkillResource($skill),
                'Skill added successfully',
                201
            );
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Freelancer profile not found', 404);
        } catch (\Exception $e) {
            Log::error('Failed to add skill: ' . $e->getMessage());
            return $this->errorResponse('Failed to add skill', 500);
        }
    }
}
