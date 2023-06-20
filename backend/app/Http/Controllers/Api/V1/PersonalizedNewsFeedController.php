<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ResponseController;
use App\Http\Controllers\Controller;
use App\Services\NewsService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illuminate\Http\Response;

class PersonalizedNewsFeedController extends Controller
{
    /**
     * Handle the incoming request.
     *
     */
    public function __invoke(NewsService $newsService): JsonResponse
    {
        return ResponseController::response(message: "Personalized News", code: Response::HTTP_OK, data: $newsService->getPersonalizedNews(auth()->user()));
    }
}
