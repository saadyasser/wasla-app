<?php

namespace App\Http\Resources\Freelancer;

use App\Http\Resources\ClientProfileResource;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title ?? 'Untitled Project',
            'description' => $this->description ?? 'No description provided',
            'status' => $this->status,
            'budget' => (float) $this->budget,
            'duration' => $this->duration, // e.g. "6 weeks"
            'deadline' => $this->deadline?->toDateString(),
            'completed_at' => $this->completed_at,
            'rating' => $this->rating,
            'experience_level' => $this->experience_level,
            'created_at_human' => $this->created_at->diffForHumans(),
            'proposals_count' => $this->applications?->count(),

            'review_comment' => optional($this->review()->latest()->first())->comment,


            // client info
            'client' => [
                'id' => $this->clientProfile->id,
                'company_name' => $this->clientProfile->company_name,
            ],
            // skills names
            'skills' =>  $this->skills->pluck('name'),

        ];
    }
}
