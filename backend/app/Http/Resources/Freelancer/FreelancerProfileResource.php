<?php

namespace App\Http\Resources\Freelancer;

use App\Http\Resources\UserResource;

use App\Http\Resources\Freelancer\{EducationResource, SocialLinkResource, CertificationResource, SkillResource, PortfolioResource, ProjectResource};
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FreelancerProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResource($this->whenLoaded('user')),
            'title' => $this->title,
            'bio' => $this->bio,
            'hourly_rate' => (float) $this->hourly_rate,
            'profile_image_url' => $this->profile_image_url,

            'phone_number' => $this->phone_number,
            'website' => $this->website,
            'location' => $this->location,
            'available' => $this->available,
            'is_complete' => $this->is_complete,

            // stats
            'total_earnings' => (float) $this->total_earnings,
            'completed_projects_count' => (int) $this->completed_projects_count,
            'reviews_count' => (int) $this->reviews_count,
            'average_rating' => $this->average_rating ? round($this->average_rating, 1) : null,

            // relations
            'skills' => SkillResource::collection($this->whenLoaded('skills')),
            'portfolios' => PortfolioResource::collection($this->whenLoaded('portfolios')),
            'projects' => ProjectResource::collection($this->whenLoaded('projects')),
            'social_links' => SocialLinkResource::collection($this->whenLoaded('socialLinks')),
            'certifications' => CertificationResource::collection($this->whenLoaded('certifications')),
            'educations' => EducationResource::collection($this->whenLoaded('educations')),
        ];
    }
}
