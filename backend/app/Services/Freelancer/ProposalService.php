<?php

namespace App\Services\Freelancer;

use App\Models\Proposal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProposalService
{
    /**
     * إنشاء عرض جديد (Proposal)
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int   $freelancerId
     * @param  int   $projectId
     * @return Proposal
     *
     * @throws \Exception إذا تمت محاولة التقديم مرتين
     */
    public function createProposal(Request $request, int $freelancerId, int $projectId): Proposal
    {

        $alreadyApplied = Proposal::where('project_id', $projectId)
            ->where('freelancer_profile_id', $freelancerId)
            ->exists();

        if ($alreadyApplied) {
            throw new \Exception('You have already applied to this project.');
        }


        $attachmentPath = $request->hasFile('attachment')
            ? $this->storeAttachment($request->file('attachment'), $freelancerId)
            : null;


        $data = $request->validated();
        $data['project_id'] = $projectId;
        $data['freelancer_profile_id'] = $freelancerId;
        $data['attachment'] = $attachmentPath;


        return Proposal::create($data);
    }

    /**
     *
     *
     * @param  Proposal $proposal
     * @param  array    $data
     * @return Proposal
     */
    public function updateProposal(Proposal $proposal, array $data): Proposal
    {
        $proposal->update($data);

        return $proposal;
    }

    /**
     *
     *
     * @param  Proposal $proposal
     * @return void
     */
    public function deleteProposal(Proposal $proposal): void
    {
        $proposal->delete();
    }

    /**
     *
     *
     * @param  \Illuminate\Http\UploadedFile  $file
     * @param  int  $freelancerId
     * @return string|null
     */
    protected function storeAttachment($file, int $freelancerId): ?string
    {
        $filename = time() . '_' . $file->getClientOriginalName();

        return $file->storeAs("attachments/{$freelancerId}", $filename, 'public');
    }
}
