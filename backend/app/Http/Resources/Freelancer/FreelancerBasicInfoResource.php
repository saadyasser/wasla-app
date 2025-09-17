<?php

namespace App\Http\Resources\Freelancer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FreelancerBasicInfoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
         return [
            'full_name' => $this->user->name,
            'email' => $this->user->email,
            'title' => $this->title,
            'bio' => $this->bio,
            'hourly_rate' => $this->hourly_rate,
            'location' => $this->location,
            'available' => $this->available,
        ];
    }
}
