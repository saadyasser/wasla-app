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
            'review_comment' => optional($this->review()->latest()->first())->comment,


            // client info
            'client' => ClientProfileResource::make($this->whenLoaded('clientProfile')->user),

            // skills names
            'skills' => SkillResource::collection($this->whenLoaded('skills')),

        ];
    }
}
