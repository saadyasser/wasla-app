<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FreelancerProfileRequest extends FormRequest
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
        return [
            'title' => 'sometimes|required|string|max:255',
            'bio' => 'sometimes|required|string',
            'hourly_rate' => 'sometimes|nullable|numeric|min:0',
            'profile_image_path' => 'sometimes|nullable|image|max:2048',
            'phone_number' => 'sometimes|nullable|string|max:20',
            'website' => 'sometimes|nullable|url|max:255',
            'location' => 'sometimes|nullable|string|max:255',
            'available' => 'sometimes|boolean',
            'skills' => 'sometimes|array',
            'skills.*' => 'exists:skills,id',
            'social_links' => 'sometimes|array',
            'social_links.*.platform_name' => 'required_with:social_links|string|max:50',
            'social_links.*.url' => 'required_with:social_links|url|max:255',
            'certifications' => 'sometimes|array',
            'certifications.*.file_name' => 'required_with:certifications|string|max:50',
            'certifications.*.file_path' => 'file|max:5120',
            // إضافة تعليم
            'educations' => 'sometimes|array',
            'educations.*.university' => 'required_with:educations|string|max:255',
            'educations.*.degree' => 'required_with:educations|string|max:255',
            'educations.*.field' => 'nullable|string|max:255',
            'educations.*.from' => 'nullable|date',
            'educations.*.to' => 'nullable|date|after_or_equal:educations.*.from',
        ];
    }
}
