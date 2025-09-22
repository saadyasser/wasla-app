<?php

namespace App\Http\Resources;

use App\Enums\ProjectStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Freelancer\ProjectResource;

class ClientProfileResource extends JsonResource
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
            'company_name' => $this->company_name,
            'company_info' => $this->company_info,
            'user' => UserResource::make($this->whenLoaded('user')),
            'location' => $this->location,
            'website' => $this->website,

            'rating' => $this->review?->rating,
            'projects' => ProjectResource::collection($this->whenLoaded('projects')),
            'projects_stats' => [
                'total' => $this->total_projects_count ?? $this->projects?->count() ?? 0,
                'open' => $this->open_projects_count ?? $this->projects?->where('status', ProjectStatus::Open->value)->count() ?? 0,
                'in_progress' => $this->in_progress_projects_count ?? $this->projects?->where('status', ProjectStatus::InProgress->value)->count() ?? 0,
                'completed' => $this->completed_projects_count ?? $this->projects?->where('status', ProjectStatus::Completed->value)->count() ?? 0,
                'canceled' => $this->canceled_projects_count ?? $this->projects?->where('status', ProjectStatus::Canceled->value)->count() ?? 0,
            ],
        ];
    }
}
