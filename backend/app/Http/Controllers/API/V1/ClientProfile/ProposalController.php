<?php

namespace App\Http\Controllers\API\V1\ClientProfile;

use App\Enums\ProjectStatus;
use App\Models\Proposal;
use Illuminate\Http\Request;
use App\Enums\ProposalStatus;
use App\Http\Traits\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProposalController extends Controller
{
    use ApiResponse, AuthorizesRequests;

    public function acceptProposal(Proposal $proposal)
    {
        $this->authorize('accept', $proposal);

        if ($proposal->status->value !== ProposalStatus::Pending->value) {
            return $this->errorResponse('Proposal already processed', 400);
        }


        $proposal->status = ProposalStatus::Accepted->value;

        $proposal->status = 'accepted';
        $proposal->save();

        // تحديث المشروع للفريلانسر وحالة in_progress
        $project = $proposal->project;
        $project->freelancer_profile_id = $proposal->freelancer_profile_id;
        $project->status = ProjectStatus::InProgress->value;
        $project->save();

        // رفض باقي الاقتراحات
        Proposal::where('project_id', $proposal->project_id)
            ->where('id', '!=', $proposal->id)
            ->update(['status' => ProposalStatus::Rejected->value]);

        return $this->successResponse($proposal, 'Proposal accepted and project updated');
    }
}
