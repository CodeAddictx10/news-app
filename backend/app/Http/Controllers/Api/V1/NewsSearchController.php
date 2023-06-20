<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\ResponseController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\NewsService;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class NewsSearchController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(NewsService $newsService, Request $request): JsonResponse
    {
        return ResponseController::response(message: "Filtered News", code: Response::HTTP_OK, data: $newsService->getNews($request->collect()));
    }
}
