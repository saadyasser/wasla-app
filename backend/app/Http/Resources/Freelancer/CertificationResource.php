<?php

namespace App\Http\Resources\Freelancer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CertificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'certification_name' => $this->certification_name,
            'certification_url' => $this->certification_url
        ];
    }
}
