<?php

namespace App\Http\Requests\API\V1\ClientProfile\Project;

use App\Models\Project;
use App\Enums\ExperienceLevel;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->clientProfile;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'budget' => 'sometimes|required|numeric|min:1',
            'deadline' => 'sometimes|required|date|after:today',
            'experience_level' => ['sometimes|required', Rule::in(array_column(ExperienceLevel::cases(), 'value'))],
            'skills' => 'sometimes|required|array',
            'skills.*' => 'exists:skills,id'
        ];
    }
}
