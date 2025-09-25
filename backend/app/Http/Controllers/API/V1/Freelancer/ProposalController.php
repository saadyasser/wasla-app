<?php

namespace App\Http\Controllers\API\V1\Freelancer;

use App\Models\Project;
use App\Models\Proposal;
use App\Http\Traits\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Requests\API\V1\FreelancerProfile\ProposalRequest;
use App\Http\Requests\API\V1\FreelancerProfile\UpdateProposalRequest;

class ProposalController extends Controller
{
    use ApiResponse;
    use AuthorizesRequests;


    public function store(ProposalRequest $request,  Project $project)
    {
        $freelancer = Auth::user()->freelancerProfile;

        // Policy يتحقق من كل الشروط
        $this->authorize('create', [Proposal::class, $project]);

        $alreadyApplied = Proposal::where('project_id', $project->id)
            ->where('freelancer_profile_id', $freelancer->id)
            ->exists();

        if ($alreadyApplied) {
            return $this->errorResponse('You have already applied to this project.', 409);
        }

        $attachmentPath = $request->hasFile('attachment')
            ? $request->file('attachment')->storeAs(
                "attachments/{$freelancer->id}",
                time() . '_' . $request->file('attachment')->getClientOriginalName(),
                'public'
            )
            : null;

        $data = $request->validated();
        $data['project_id'] = $project->id;
        $data['freelancer_profile_id'] = $freelancer->id;
        $data['attachment'] = $attachmentPath;

        $proposal = Proposal::create($data);

        return $this->successResponse($proposal, 'Proposal submitted successfully', 201);
    }



    public function update(UpdateProposalRequest $request, Proposal $proposal)
    {
        $this->authorize('update', $proposal);

        $data = $request->validated();

        $proposal->update($data);

        return $this->successResponse($proposal, 'Proposal updated successfully');
    }

    public function destroy(Proposal $proposal)
    {
        $this->authorize('delete', $proposal); // يتحقق من Policy تلقائياً

        $proposal->delete();

        return $this->successResponse([], 'Proposal deleted successfully', 200);
    }
}
