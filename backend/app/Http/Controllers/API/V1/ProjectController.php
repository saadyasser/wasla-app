<?php

namespace App\Http\Controllers\API\V1;

use App\Enums\ProjectStatus;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Freelancer\ProjectResource;
use App\Http\Traits\ApiResponse;
use App\Models\Project;

class ProjectController extends Controller
{
    use ApiResponse;
    public function index(Request $request)
    {
        $projects = Project::with(['skills', 'clientProfile.user'])
            ->where('status', ProjectStatus::Open->value)
            ->filter($request->all())
            ->latest()
            ->paginate(10);


        return $this->successResponse(
            ProjectResource::collection($projects),
            'Projects retrieved successfully',
            200
        );
    }
}
