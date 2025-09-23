<?php

namespace App\Http\Requests\API\V1\ClientProfile\Project;

use App\Enums\ExperienceLevel;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->clientProfile;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'budget' => 'required|numeric|min:1',
            'deadline' => 'required|date|after:today',
            'experience_level' => ['required', Rule::in(array_column(ExperienceLevel::cases(), 'value'))],
            'skills' => 'array',
            'skills.*' => 'exists:skills,id'
        ];
    }
}
