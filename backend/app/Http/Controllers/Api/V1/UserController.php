<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserFormRequest;
use App\Services\UserService;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ResponseController;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function __construct(private readonly UserService $userService)
    {
        $this->middleware('auth:api')->except(['store']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return ResponseController::response(message: "Auth User", code: Response::HTTP_OK, data: auth()->user());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserFormRequest $request): JsonResponse
    {
        $user = $this->userService->create($request->validated());
        $token = auth()->login($user);
        return ResponseController::response(message: "User has been created successfully", code: Response::HTTP_CREATED, data: [
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserFormRequest $request)
    {
        $user = $this->userService->update(auth()->user(), $request->validated());
        return ResponseController::response(message: "User has been updated successfully", code: Response::HTTP_OK, data: $user);
    }
}
