<?php

namespace App\Http\Requests\API\V1\FreelancerProfile;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProposalRequest extends FormRequest
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
            'cover_letter' => 'sometimes|required|string',
            'budget'       => 'sometimes|required|numeric|min:1',
            'timeline'     => 'sometimes|required|string',
            'attachment'   => 'sometimes|nullable|file|mimes:pdf,doc,docx|max:10240',

        ];
    }
}
