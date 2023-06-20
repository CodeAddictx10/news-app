<?php

namespace App\Traits;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\Api\ResponseController;

trait FailedValidation
{
    /**
     * Custom response message for failed validation.
     */
    public function failedValidation(Validator $validator): JsonResponse
    {
        $response = ResponseController::response(message: $validator->errors()->all()[0], code: Response::HTTP_BAD_REQUEST);

        throw new ValidationException($validator, $response);
    }
}
