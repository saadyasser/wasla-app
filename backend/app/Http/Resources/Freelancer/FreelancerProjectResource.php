<?php

namespace App\Http\Resources\Freelancer;

use Illuminate\Http\Resources\Json\JsonResource;

class FreelancerProjectResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title ?? 'Untitled Project',
            'description' => $this->description ?? 'No description provided',
            'status' => $this->status,
            'budget' => (float) $this->budget,
            'duration' => $this->duration,
            'deadline' => $this->deadline?->toDateString(),
            'completed_at' => $this->completed_at,
            'freelancer_profile_id' => $this->freelancer_profile_id,
            'rating' => $this->rating,
            'experience_level' => $this->experience_level,
            'created_at_human' => $this->created_at->diffForHumans(),


           'review_comment' => optional($this->review)->comment,

            'client' => [
                'id' => $this->clientProfile->id,
                'company_name' => $this->clientProfile->company_name,
            ],

            'skills' => $this->skills->pluck('name'),
        ];
    }
}
