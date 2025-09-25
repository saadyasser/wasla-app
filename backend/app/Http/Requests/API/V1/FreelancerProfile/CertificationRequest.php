<?php

namespace App\Http\Requests\API\V1\FreelancerProfile;

use Illuminate\Foundation\Http\FormRequest;

class CertificationRequest extends FormRequest
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
                'certification_name' => 'required|string|max:255',
                'certification_url' => 'nullable|url|max:255',
                'issuer' => 'required|string|max:255',
                'date_obtained' => 'required|date',
                'expiry_date' => 'nullable|date|after_or_equal:date_obtained',
                'description' => 'nullable|string',
            ];
        } elseif ($this->isMethod('patch') || $this->isMethod('put')) {

            return [
                'certification_name' => 'sometimes|string|max:255',
                'certification_url' => 'sometimes|nullable|url|max:255',
                'issuer' => 'sometimes|string|max:255',
                'date_obtained' => 'sometimes|date',
                'expiry_date' => 'sometimes|nullable|date|after_or_equal:date_obtained',
                'description' => 'sometimes|nullable|string',
            ];
        }


        return [];
    }
}
