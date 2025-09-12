<?php

namespace App\Http\Requests\API\V1\FreelancerProfile;

use Illuminate\Foundation\Http\FormRequest;

class AddSkillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'skill_id' => 'sometimes|required_without:name|exists:skills,id',
            'name' => 'sometimes|required_without:skill_id|string|max:255',
        ];
    }
}
