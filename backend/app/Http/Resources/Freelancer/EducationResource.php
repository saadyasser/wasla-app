<?php

namespace App\Http\Resources\Freelancer;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EducationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'university' => $this->university,
            'degree' => $this->degree,
            'field' => $this->field,
            'from' => $this->from,
            'to' => $this->to
        ];
    }
}
