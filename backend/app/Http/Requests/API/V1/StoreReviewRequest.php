<?php

namespace App\Http\Requests\API\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreReviewRequest extends FormRequest
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

            'rating'  => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:2000',

        ];
    }

    public function messages(): array
    {
        return [
            'rating.required' => 'Please provide a rating between 1 and 5.',
            'rating.min'      => 'Rating must be at least 1.',
            'rating.max'      => 'Rating may not be greater than 5.',
        ];
    }
}
