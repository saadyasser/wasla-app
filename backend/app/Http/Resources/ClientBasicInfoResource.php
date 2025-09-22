<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientBasicInfoResource extends JsonResource
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
            'full_name' => $this->user->name,
            'email' => $this->user->email,
            'company_name' => $this->company_name,
            'company_info'=>$this->company_info,
            'website'=>$this->website,
            'location' => $this->location,



        ];
    }
}
