<?php

namespace App\Http\Resources;

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
            'type' => 'client_profile',
            'id' => $this->id,
            'attributes' => [
                'company_name' => $this->company_name,
                'company_info' => $this->company_info,
                'website' => $this->website,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ],
            'relationships' => [
                'user' => new UserResource($this->whenLoaded('user')),
                'projects' => [
                    'data' => optional($this->user)->projects
                        ? $this->user->projects->load('review')->map(function ($project) {
                            $reviews = $project->review;
                            $totalReviews = $reviews?->count() ?? 0;
                            $averageRating = $totalReviews > 0 ? round($reviews->avg('rating'), 2) : null;
                            return [
                                'name' => $project->title,
                                'status' => $project->status,
                                'id' => $project->id,
                                'reviews' => [
                                    'total' => $totalReviews,
                                    'average_rating' => $averageRating ,
                                ]
                            ];
                        })
                        : collect(),
                    'meta' => [
                        'total' => $this->user->projects ? $this->user->projects->count() : 0,
                        'in_progress' => $this->user->projects ? $this->user->projects->where('status', 'in-progress')->count() : 0,
                        'completed' => $this->user->projects ? $this->user->projects->where('status', 'completed')->count() : 0,
                        'canceled' => $this->user->projects ? $this->user->projects->where('status', 'canceled')->count() : 0,
                    ]
                ],

            ],

        ];
    }
}
