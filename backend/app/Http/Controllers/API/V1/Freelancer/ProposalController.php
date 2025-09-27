<?php

namespace App\Http\Controllers\API\V1\Freelancer;

use App\Models\Project;
use App\Models\Proposal;
use App\Http\Traits\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\Freelancer\ProposalService;
use App\Http\Resources\Freelancer\ProposalResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Requests\API\V1\FreelancerProfile\ProposalRequest;
use App\Http\Requests\API\V1\FreelancerProfile\UpdateProposalRequest;

class ProposalController extends Controller
{
    use ApiResponse;
    use AuthorizesRequests;

    protected ProposalService $proposalService;

    public function __construct(ProposalService $proposalService)
    {
        $this->proposalService = $proposalService;
    }

    public function store(ProposalRequest $request, $projectId)
    {
        $project = Project::find($projectId);

        if (! $project) {
            return $this->errorResponse('Project not found', 404);
        }

        $freelancer = Auth::user()->freelancerProfile;

        $this->authorize('create', [Proposal::class, $project]);

        try {
            $proposal = $this->proposalService->createProposal($request, $freelancer->id, $project->id);
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 409);
        }

        return $this->successResponse(new ProposalResource($proposal), 'Proposal submitted successfully', 201);
    }


    public function update(UpdateProposalRequest $request, Proposal $proposal)
    {
        $this->authorize('update', $proposal);

        $data = $request->validated();
        $proposal = $this->proposalService->updateProposal($proposal, $data);

        return $this->successResponse($proposal, 'Proposal updated successfully');
    }

    public function destroy(Proposal $proposal)
    {
        $this->authorize('delete', $proposal);
        $this->proposalService->deleteProposal($proposal);
        return $this->successResponse([], 'Proposal deleted successfully', 200);
    }
}
