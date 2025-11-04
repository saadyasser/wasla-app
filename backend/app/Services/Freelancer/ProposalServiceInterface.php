<?php

namespace App\Services\Freelancer;

use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Container\Attributes\Bind;
#[Bind(ProposalService::class)]

interface ProposalServiceInterface
{
    public function createProposal(Request $request, int $freelancerId, int $projectId): Proposal;
    public function updateProposal(Proposal $proposal, array $data): Proposal;
    public function deleteProposal(Proposal $proposal): void;
}
