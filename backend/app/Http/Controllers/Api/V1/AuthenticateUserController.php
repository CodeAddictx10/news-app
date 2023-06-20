<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthenticateUserFormRequest;
use App\Models\User;
use App\Http\Controllers\Api\ResponseController;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class AuthenticateUserController extends Controller
{
    /**
     * Authenticate user
     */
    public function store(AuthenticateUserFormRequest $request): JsonResponse
    {
        try {
            if ($token = auth()->attempt($request->validated())) {
                return ResponseController::response(message: "Logged In", code: Response::HTTP_OK, data: ["token" => $token, "user" => auth()->user()]);
            }

            return ResponseController::response(message: "Invalid credentials", code: Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $error) {
            return ResponseController::response(message: $error->getMessage(), code: $error->getCode());
        }

    }

    /**
    * log out user
     */
    public function destroy(): JsonResponse
    {
        try {
            auth()->logout();
            return ResponseController::response(message: "Logged Out", code: Response::HTTP_OK);
        } catch (\Exception $error) {
            return ResponseController::response(message: $error->getMessage(), code: $error->getCode());
        }
    }
}
