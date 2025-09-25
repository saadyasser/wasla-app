<?php

namespace App\Http\Requests\API\V1\FreelancerProfile;

use App\Models\Certification;
use App\Models\Education;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class FreelancerUpdateRequest extends FormRequest
{
    public function authorize()
    {

        return $this->user() && $this->user()->freelancerProfile;
    }

    public function rules()
    {
        return [
            'name' => 'nullable|string|max:255',
            'email' => [
                'sometimes',
                'email',
                Rule::unique('users')
                    ->ignore($this->user()->id),
            ],


            'title' => 'sometimes|nullable|string|max:255',
            'bio' => 'sometimes|nullable|string',
            'hourly_rate' => 'sometimes|nullable|numeric|min:0',
            'location' => 'sometimes|nullable|string|max:255',
            'available' => 'sometimes|nullable|boolean',

        ];
    }
}
