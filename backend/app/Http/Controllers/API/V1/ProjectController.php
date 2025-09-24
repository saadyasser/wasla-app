<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Project;
use App\Http\Traits\ApiResponse;
use App\Services\ProjectService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\Freelancer\ProjectResource;
use App\Http\Requests\API\V1\ClientProfile\Project\StoreProjectRequest;
use App\Http\Requests\API\V1\ClientProfile\Project\UpdateProjectRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProjectController extends Controller
{
    use ApiResponse;
    use AuthorizesRequests;
    protected ProjectService $service;

    public function __construct(ProjectService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $projects = $this->service->getAllProjects();

        $projectsCollection = new ProjectCollection($projects);

        return $this->successResponse(
            $projectsCollection,
            'Projects retrieved successfully',
            200
        );
    }

    public function show(Project $project)
    {
        $project = $this->service->loadRelations($project);
        return $this->successResponse(new ProjectResource($project), 'Project retrieved successfully');
    }

    public function store(StoreProjectRequest $request)
    {
        $project = $this->service->createProject(Auth::user(), $request->validated());
        return $this->successResponse(new ProjectResource($project), 'Project created successfully', 201);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $this->authorize('update', $project);

        $project = $this->service->updateProject($project, $request->validated());
        return $this->successResponse(new ProjectResource($project), 'Project updated successfully');
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);

        $this->service->deleteProject($project);
        return $this->successResponse(null, 'Project deleted successfully');
    }
}
