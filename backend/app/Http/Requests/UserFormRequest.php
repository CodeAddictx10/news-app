<?php

namespace App\Http\Requests;

use App\Traits\FailedValidation;
use Illuminate\Foundation\Http\FormRequest;

class UserFormRequest extends FormRequest
{
    use FailedValidation;
    /**
     * Indicates if the validator should stop on the first rule failure.
     * @var bool
     */
    protected $stopOnFirstFailure = true;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {

        if ($this->routeIs('users.store')) {
            return [
                 "first_name" => ["required", "string"],
                 "last_name" => ["required", "string"],
                 "email" => ["sometimes", "email", "unique:users,email"],
                 "password" => ["required","min:6", "max:25"],
            ];

        }

        if ($this->routeIs('auth.update')) {
            return [
                 'first_name' => ["sometimes", "string"],
                 'last_name' => ["sometimes", "string"],
                 'settings' => ["sometimes"],
            ];

        }


        return [];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'first_name.required' => 'First name is required',
            'first_name.string' => 'First name must be a string',
            'last_name.required' => 'Last name is required',
            'last_name.string' => 'Last name must be a string',
            'email.required' => 'Email is required',
            'email.unique' => 'Email is not available',
            'password.required' => 'Password is required',
            'password.min' => 'Password must be minimum of 6 characters',
            'password.max' => 'Password must be maximum of 25 characters',
        ];
    }
}
