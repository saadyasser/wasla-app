<?php

namespace App\Http\Requests\API\V1\ClientProfile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() && $this->user()->clientProfile;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //user table
            'name'  => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $this->user()->id,
            //client profile
            'company_name' => 'sometimes|string|max:255',
            'company_info' => 'sometimes|string',
            'website'      => 'sometimes|url|max:255',
            'location'     => 'sometimes|string|max:255',
        ];
    }
}
