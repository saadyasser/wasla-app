<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'name' => $this->clientProfile->company_name ?? $this->clientProfile->user->name,
            'location' => $this->clientProfile->location ?? null,
            'rating' => $this->review?->rating,
        ];
    }
}
