<?php

namespace App\Http\Requests\API\V1\FreelancerProfile;

use Illuminate\Foundation\Http\FormRequest;

class SocialLinkRequest extends FormRequest
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
                'platform_name' => 'required|string|max:255',
                'url' => 'required|url|max:255',
            ];
        } elseif ($this->isMethod('patch') || $this->isMethod('put')) {

            return [
                'platform_name' => 'sometimes|string|max:255',
                'url' => 'sometimes|url|max:255',
            ];
        }


        return [];
    }
}
