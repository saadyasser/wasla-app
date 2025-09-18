<?php

namespace App\Http\Requests\API\V1\FreelancerProfile;

use Illuminate\Foundation\Http\FormRequest;

class EducationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */


    public function rules(): array
    {
        if ($this->isMethod('post')) {
            return [
                'university' => 'required|string|max:255',
                'degree' => 'required|string|max:255',
                'field' => 'required|string|max:255',
                'from' => 'required|digits:4|integer|min:1900|max:' . date('Y'),
                'to' => 'nullable|digits:4|integer|min:1900|max:' . (date('Y') + 10) . '|gt:from',
            ];
        } elseif ($this->isMethod('patch') || $this->isMethod('put')) {
            return [
                'university' => 'sometimes|string|max:255',
                'degree' => 'sometimes|string|max:255',
                'field' => 'sometimes|string|max:255',
                'from' => 'sometimes|digits:4|integer|min:1900|max:' . date('Y'),
                'to' => 'sometimes|nullable|digits:4|integer|min:1900|max:' . (date('Y') + 10) . '|gt:from',
            ];
        }

        return [];
    }
}
