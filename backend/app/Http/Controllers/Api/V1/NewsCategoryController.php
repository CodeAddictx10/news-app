<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\NewsService;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Api\ResponseController;
use Illuminate\Http\Response;

class NewsCategoryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(NewsService $newsService): JsonResponse
    {
        return ResponseController::response(message: "News Categories", code: Response::HTTP_OK, data: $newsService->getNewsCategories());
    }
}
