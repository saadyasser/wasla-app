<?php

namespace App\Http\Resources\Freelancer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProposalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'freelancer_profile_id' => $this->freelancer_profile_id,
            'project_id' => $this->project_id,
            'cover_letter' => $this->cover_letter ?? '',
            'proposed_budget' => (float) $this->budget,
            'estimated_duration' => $this->estimated_duration,
            'status' => $this->status,
            'created_at_human' => $this->created_at->diffForHumans(),
            'attachment_url' => $this->attachment ? asset('storage/' . $this->attachment) : null,

            'freelancer' => $this->freelancerProfile ? [
                'id' => $this->freelancerProfile->id,
                'name' => $this->freelancerProfile->user->name,
                'rating' => $this->freelancerProfile->average_rating,
            ] : null,
        ];
    }
}
