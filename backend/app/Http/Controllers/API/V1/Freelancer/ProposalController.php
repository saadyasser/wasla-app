<?php

namespace App\Http\Controllers\API\V1\Freelancer;

use App\Models\Project;
use App\Models\Proposal;
use App\Enums\ProjectStatus;
use Illuminate\Http\Request;
use App\Http\Traits\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Requests\API\V1\FreelancerProfile\ProposalRequest;

class ProposalController extends Controller
{
    use ApiResponse;



    public function store(ProposalRequest $request, $projectId)
    {
        try {
            $project = Project::findOrFail($projectId);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Project not found', 404);
        }
        $freelancer = Auth::user()->freelancerProfile;


        if ($project->status !== ProjectStatus::Open) {
            return $this->errorResponse('You can only apply to open projects.', 403);
        }


        $alreadyApplied = Proposal::where('project_id', $project->id)
            ->where('freelancer_profile_id', $freelancer->id)
            ->exists();

        if ($alreadyApplied) {
            return $this->errorResponse('You have already applied to this project.', 409);
        }


        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->storeAs(
                "attachments/{$freelancer->id}",
                time() . '_' . $request->file('attachment')->getClientOriginalName(),
                'public'
            );
        }


        $data = $request->validated();
        $data['project_id']            = $project->id;
        $data['freelancer_profile_id'] = $freelancer->id;
        $data['attachment']            = $attachmentPath;


        $proposal = Proposal::create($data);

        return $this->successResponse($proposal, 'Proposal submitted successfully', 201);
    }


    public function destroy(Proposal $proposal)
    {
        $freelancer = Auth::user()->freelancerProfile;

        if ($proposal->freelancer_profile_id !== $freelancer->id) {
            return $this->errorResponse('Unauthorized', 403);
        }

        $proposal->delete();

        return $this->successResponse([], 'Application deleted successfully', 200);
    }
}
